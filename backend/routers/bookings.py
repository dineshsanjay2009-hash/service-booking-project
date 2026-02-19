from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.booking_model import Booking
from models.package_model import Package
from schemas.booking_schema import (
    BookingCreate,
    BookingUpdate,
    BookingOut
)

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)

# -------------------------
# CREATE BOOKING
# -------------------------
@router.post("/", response_model=BookingOut)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    # ⚠ IMPORTANT: booking must include user_id from frontend
    new_booking = Booking(**booking.dict())

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking


# -------------------------
# GET ALL BOOKINGS
# -------------------------
@router.get("/", response_model=list[BookingOut])
def get_all_bookings(db: Session = Depends(get_db)):
    return db.query(Booking).order_by(Booking.id.desc()).all()


# -------------------------
# UPDATE BOOKING
# -------------------------
@router.put("/{booking_id}", response_model=BookingOut)
def update_booking(
    booking_id: int,
    booking: BookingUpdate,
    db: Session = Depends(get_db)
):
    db_booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    for key, value in booking.dict(exclude_unset=True).items():
        setattr(db_booking, key, value)

    db.commit()
    db.refresh(db_booking)
    return db_booking


# -------------------------
# DELETE BOOKING
# -------------------------
@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    db.delete(booking)
    db.commit()
    return {"message": "Booking deleted successfully"}


# -------------------------
# ADD PACKAGE TO EXISTING BOOKING
# -------------------------
@router.put("/{booking_id}/add-package", response_model=BookingOut)
def add_package_to_booking(
    booking_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    package_id = data.get("package_id")
    package = db.query(Package).filter(Package.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")

    booking.package_id = package.id
    booking.package_name = package.title
    booking.package_price = package.price
    booking.booking_type = "service+package"

    db.commit()
    db.refresh(booking)
    return booking


# -------------------------
# GET MY BOOKINGS (USER BASED)
# -------------------------
@router.get("/my/{user_id}", response_model=list[BookingOut])
def get_my_bookings(user_id: int, db: Session = Depends(get_db)):
    bookings = (
        db.query(Booking)
        .filter(Booking.user_id == user_id)
        .order_by(Booking.id.desc())
        .all()
    )

    return bookings
