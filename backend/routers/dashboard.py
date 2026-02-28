from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date, timedelta, datetime

from database import get_db
from models.booking_model import Booking
from core.security import get_current_user

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


# 🔐 Admin-only dependency
def admin_required(user=Depends(get_current_user)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return user


# ✅ DASHBOARD STATS
@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    user=Depends(admin_required)
):
    total = db.query(Booking).count()
    pending = db.query(Booking).filter(Booking.status == "pending").count()
    confirmed = db.query(Booking).filter(Booking.status == "confirmed").count()
    completed = db.query(Booking).filter(Booking.status == "completed").count()

    bike_bookings = db.query(func.count(Booking.id)) \
        .filter(Booking.service_type == "bike") \
        .scalar()

    car_bookings = db.query(func.count(Booking.id)) \
        .filter(Booking.service_type == "car") \
        .scalar()

    package_bookings = db.query(func.count(Booking.id)) \
        .filter(Booking.package_id.isnot(None)) \
        .scalar()

    return {
        "totalBookings": total,
        "pendingBookings": pending,
        "confirmedBookings": confirmed,
        "completedBookings": completed,
        "bikeBookings": bike_bookings,
        "carBookings": car_bookings,
        "packageBookings": package_bookings
    }


# ✅ WEEKLY BOOKINGS (UNCHANGED)
@router.get("/weekly-bookings")
def weekly_bookings(
    db: Session = Depends(get_db),
    user=Depends(admin_required)
):
    today = date.today()
    start_date = today - timedelta(days=6)

    bookings = db.query(Booking).all()
    result = {}

    for booking in bookings:
        try:
            booking_day = datetime.strptime(
                booking.booking_date, "%Y-%m-%d"
            ).date()
        except:
            continue

        if booking_day >= start_date:
            day_name = booking_day.strftime("%a")
            result[day_name] = result.get(day_name, 0) + 1

    return [
        {"day": day, "count": count}
        for day, count in result.items()
    ]


# ✅ SERVICE DISTRIBUTION (UNCHANGED)
@router.get("/service-distribution")
def service_distribution(
    db: Session = Depends(get_db),
    user=Depends(admin_required)
):
    bike = db.query(func.count(Booking.id)) \
        .filter(Booking.service_type == "bike") \
        .scalar()

    car = db.query(func.count(Booking.id)) \
        .filter(Booking.service_type == "car") \
        .scalar()

    return {
        "bike": bike,
        "car": car
    }


# ✅ MONTHLY REVENUE (FIXED - USING total_amount)
@router.get("/monthly-revenue")
def monthly_revenue(
    db: Session = Depends(get_db),
    user=Depends(admin_required)
):
    bookings = db.query(Booking).all()
    result = {}

    for booking in bookings:
        try:
            booking_date = datetime.strptime(
                booking.booking_date, "%Y-%m-%d"
            )
        except:
            continue

        month = booking_date.strftime("%b")

        # 🔥 IMPORTANT FIX HERE
        amount = booking.total_amount if booking.total_amount else 0

        result[month] = result.get(month, 0) + amount

    return [
        {"month": month, "amount": amount}
        for month, amount in result.items()
    ]