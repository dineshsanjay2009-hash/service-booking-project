from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date, timedelta, datetime

from database import get_db
from models.booking_model import Booking

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total = db.query(Booking).count()
    pending = db.query(Booking).filter(Booking.status == "pending").count()
    confirmed = db.query(Booking).filter(Booking.status == "confirmed").count()
    completed = db.query(Booking).filter(Booking.status == "completed").count()

    return {
        "totalBookings": total,
        "pendingBookings": pending,
        "confirmedBookings": confirmed,
        "completedBookings": completed
    }


# ✅ WEEKLY BOOKINGS
@router.get("/weekly-bookings")
def weekly_bookings(db: Session = Depends(get_db)):
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


# ✅ SERVICE DISTRIBUTION
@router.get("/service-distribution")
def service_distribution(db: Session = Depends(get_db)):
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
