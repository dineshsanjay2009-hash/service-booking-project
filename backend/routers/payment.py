from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import razorpay
import os

router = APIRouter(
    prefix="/payment",
    tags=["Payment"]
)

client = razorpay.Client(
    auth=(
        os.getenv("RAZORPAY_KEY_ID"),
        os.getenv("RAZORPAY_KEY_SECRET")
    )
)

class OrderRequest(BaseModel):
    amount: int

@router.post("/create-order")
def create_order(request: OrderRequest):
    try:
        if request.amount <= 0:
            raise HTTPException(status_code=400, detail="Invalid amount")

        order = client.order.create({
            "amount": request.amount * 100,  # convert to paise
            "currency": "INR",
            "payment_capture": 1
        })

        return order

    except Exception as e:
        print("RAZORPAY ERROR:", e)
        raise HTTPException(status_code=400, detail=str(e))