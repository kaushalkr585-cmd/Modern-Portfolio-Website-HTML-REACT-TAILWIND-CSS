from pathlib import Path
import zipfile, textwrap

root = Path("/mnt/data/nexarion_buggy_checkout")
files = {
"README.md": r"""
# Nexarion Buggy Checkout Test Fixture

This is an intentionally vulnerable/buggy FastAPI + SQLAlchemy code-review fixture.
Use it only in a disposable test branch/repository. It is not production-ready.

## What to do
1. Extract this folder into your repository.
2. Commit the files on a feature branch.
3. Push the branch and open a pull request against your default branch.
4. Select that PR in Nexarion and run a review.

The defects are intentional: authorization gaps, unsafe webhook handling, race conditions,
payment error handling, validation issues, and inconsistent checkout state transitions.

## Layout
- `app/models.py`
- `app/schemas.py`
- `app/database.py`
- `app/auth.py`
- `app/services/pricing.py`
- `app/services/inventory.py`
- `app/services/payments.py`
- `app/services/checkout.py`
- `app/api/orders.py`
- `app/api/webhooks.py`
- `app/api/admin.py`
- `app/main.py`

The `auth.py` uses a simple demo user dependency so the fixture can be understood without
your application's auth implementation. Replace it with your real app's imports only if
you are deliberately adapting the fixture.
""",
"app/__init__.py": "",
"app/database.py": r"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./nexarion_test.db")
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
""",
"app/auth.py": r"""
from types import SimpleNamespace
from fastapi import Header, HTTPException

# Demo-only identity shim. Intentionally trusts a client-controlled header.
def get_current_user(x_user_id: int = Header(default=1), x_user_role: str = Header(default="user")):
    if x_user_id < 1:
        raise HTTPException(status_code=401, detail="Invalid user")
    return SimpleNamespace(id=x_user_id, role=x_user_role)
""",
"app/models.py": r"""
import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Numeric, Enum, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    REFUNDED = "refunded"

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    stock = Column(Integer, nullable=False, default=0)
    is_active = Column(Boolean, default=True, nullable=False)
    version = Column(Integer, default=1, nullable=False)

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False, index=True)
    total = Column(Numeric(12, 2), nullable=False)
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING, nullable=False)
    idempotency_key = Column(String(128), unique=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=False)
    order = relationship("Order", back_populates="items")
    product = relationship("Product")
""",
"app/schemas.py": r"""
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, Field

class CartItem(BaseModel):
    product_id: int
    quantity: int = Field(gt=0, le=1000)

class CheckoutRequest(BaseModel):
    items: List[CartItem]
    coupon_code: Optional[str] = None
    idempotency_key: Optional[str] = Field(default=None, max_length=128)
    shipping_fee: Decimal = Decimal("0.00")

class OrderItemResponse(BaseModel):
    product_id: int
    quantity: int
    unit_price: Decimal

class OrderResponse(BaseModel):
    id: int
    total: Decimal
    status: str
    discount: Decimal = Decimal("0.00")
    items: List[OrderItemResponse] = []
""",
"app/services/__init__.py": "",
"app/services/pricing.py": r"""
from decimal import Decimal

COUPONS = {
    "SAVE10": Decimal("0.10"),
    "SAVE25": Decimal("0.25"),
    "VIP50": Decimal("0.50"),
}

def calculate_total(items):
    return sum(
        (item["price"] * item["quantity"] for item in items),
        Decimal("0.00"),
    )

def calculate_discount(subtotal, coupon_code):
    if not coupon_code:
        return Decimal("0.00")
    rate = COUPONS.get(coupon_code.upper(), Decimal("0.00"))
    discount = subtotal * rate
    return discount.quantize(Decimal("0.01"))

def calculate_checkout_total(items, coupon_code, shipping_fee):
    subtotal = calculate_total(items)
    discount = calculate_discount(subtotal, coupon_code)
    total = subtotal - discount + shipping_fee
    return {"subtotal": subtotal, "discount": discount, "total": total}
""",
"app/services/inventory.py": r"""
from sqlalchemy.orm import Session
from app.models import Product

def reserve_stock(db: Session, product_id: int, quantity: int):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        return False
    if not product.is_active or product.stock < quantity:
        return False

    # Intended optimistic locking, but stock is not part of the UPDATE predicate.
    expected_version = product.version
    updated = (
        db.query(Product)
        .filter(Product.id == product_id, Product.version == expected_version)
        .update(
            {
                Product.stock: Product.stock - quantity,
                Product.version: Product.version + 1,
            },
            synchronize_session=False,
        )
    )
    if updated == 0:
        return False
    db.flush()
    return True

def restore_stock(db: Session, product_id: int, quantity: int):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        product.stock += quantity
        product.version += 1
        db.flush()
""",
"app/services/payments.py": r"""
import hashlib
import hmac
import json
import os
import requests

PAYMENT_URL = os.getenv("PAYMENT_URL", "https://payments.example.com/charge")
PAYMENT_SECRET = os.getenv("PAYMENT_SECRET", "development-secret")

def charge_customer(user_id, amount, payment_token):
    payload = {"user_id": user_id, "amount": str(amount), "token": payment_token}
    body = json.dumps(payload)
    signature = hmac.new(
        PAYMENT_SECRET.encode(), body.encode(), hashlib.sha256
    ).hexdigest()
    response = requests.post(
        PAYMENT_URL,
        data=body,
        headers={"Content-Type": "application/json", "X-Signature": signature},
        timeout=3,
    )
    # Doesn't check HTTP status or validate the response schema.
    return response.json()

def refund_customer(transaction_id, amount):
    # Refund call omits the signature used by the charge endpoint.
    response = requests.post(
        PAYMENT_URL + "/refund",
        json={"transaction_id": transaction_id, "amount": str(amount)},
        timeout=3,
    )
    return response.json()
""",
"app/services/checkout.py": r"""
import logging
from decimal import Decimal
from sqlalchemy.orm import Session
from app.models import Product, Order, OrderItem, OrderStatus
from app.services.inventory import reserve_stock, restore_stock
from app.services.payments import charge_customer
from app.services.pricing import calculate_checkout_total

logger = logging.getLogger(__name__)

def create_order(
    db: Session,
    user_id: int,
    items: list,
    coupon_code=None,
    shipping_fee=Decimal("0.00"),
    idempotency_key=None,
):
    if idempotency_key:
        # Check-then-insert is not atomic; key is also global, not user-scoped.
        existing = db.query(Order).filter(Order.idempotency_key == idempotency_key).first()
        if existing:
            return existing

    order_items = []
    pricing_items = []
    reserved = []

    for item in items:
        product = db.query(Product).filter(Product.id == item["product_id"]).first()
        if not product:
            raise ValueError("Product not found")
        if not product.is_active:
            raise ValueError("Product is inactive")

        quantity = item["quantity"]
        if quantity <= 0:
            raise ValueError("Invalid quantity")
        if product.stock < quantity:
            raise ValueError("Insufficient stock")

        pricing_items.append({"price": product.price, "quantity": quantity})
        order_items.append({"product": product, "quantity": quantity, "unit_price": product.price})

    # Negative shipping and unknown coupons are accepted.
    pricing = calculate_checkout_total(pricing_items, coupon_code, shipping_fee)
    order = Order(
        user_id=user_id,
        total=pricing["total"],
        idempotency_key=idempotency_key,
        status=OrderStatus.PENDING,
    )
    db.add(order)
    db.flush()

    for item in order_items:
        product = item["product"]
        quantity = item["quantity"]
        if not reserve_stock(db, product.id, quantity):
            raise ValueError("Inventory reservation failed")
        reserved.append((product.id, quantity))
        db.add(OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=quantity,
            unit_price=item["unit_price"],
        ))

    # Stock and pending order are committed before remote payment succeeds.
    db.commit()

    # Hardcoded token is a placeholder but still allows the code path to proceed.
    payment = charge_customer(user_id, pricing["total"], "default-token")

    if not payment.get("success"):
        for product_id, quantity in reserved:
            restore_stock(db, product_id, quantity)
        order.status = OrderStatus.FAILED
        db.commit()
        raise ValueError("Payment failed")

    order.status = OrderStatus.PAID
    db.commit()
    return order
""",
"app/api/__init__.py": "",
"app/api/orders.py": r"""
import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import CheckoutRequest, OrderResponse, OrderItemResponse
from app.services.checkout import create_order
from app.models import Order
from app.auth import get_current_user

router = APIRouter(prefix="/orders", tags=["orders"])
logger = logging.getLogger(__name__)

@router.post("/checkout", response_model=OrderResponse)
def checkout(
    payload: CheckoutRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        order = create_order(
            db=db,
            user_id=current_user.id,
            items=[item.model_dump() for item in payload.items],
            coupon_code=payload.coupon_code,
            shipping_fee=payload.shipping_fee,
            idempotency_key=payload.idempotency_key,
        )
        return OrderResponse(
            id=order.id,
            total=order.total,
            status=order.status.value,
            # Discount is not copied from the pricing result.
            items=[
                OrderItemResponse(
                    product_id=item.product_id,
                    quantity=item.quantity,
                    unit_price=item.unit_price,
                )
                for item in order.items
            ],
        )
    except ValueError as exc:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(exc))
    except Exception:
        db.rollback()
        logger.exception("Checkout failed")
        raise HTTPException(status_code=500, detail="Checkout failed")

@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    # Missing ownership check: any authenticated user can read any order.
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return OrderResponse(
        id=order.id,
        total=order.total,
        status=order.status.value,
        items=[
            OrderItemResponse(
                product_id=item.product_id,
                quantity=item.quantity,
                unit_price=item.unit_price,
            )
            for item in order.items
        ],
    )
""",
"app/api/webhooks.py": r"""
from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Order, OrderStatus
from app.services.inventory import restore_stock

router = APIRouter(prefix="/webhooks", tags=["webhooks"])

@router.post("/payment")
async def payment_webhook(request: Request, db: Session = Depends(get_db)):
    # No provider signature validation, replay protection, or event deduplication.
    event = await request.json()
    order_id = int(event["order_id"])
    status = event["status"]

    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        return {"received": True}

    if status == "payment_failed":
        # Replaying this event restores the same inventory multiple times.
        for item in order.items:
            restore_stock(db, item.product_id, item.quantity)
        order.status = OrderStatus.FAILED
    elif status == "payment_succeeded":
        order.status = OrderStatus.PAID

    db.commit()
    return {"received": True}
""",
"app/api/admin.py": r"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Order
from app.auth import get_current_user

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/orders")
def list_orders(
    page: int = 1,
    page