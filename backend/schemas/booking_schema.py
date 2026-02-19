from pydantic import BaseModel

class BookingBase(BaseModel):
    user_id: int   # ✅ compulsory

    customer_name: str
    phone: str
    booking_date: str
    booking_time: str
    service_type: str
    service_name: str
    service_id: int

    package_id: int | None = None
    package_name: str | None = None
    package_price: int | None = None
    booking_type: str | None = "service"

    status: str | None = "pending"


class BookingCreate(BookingBase):
    pass


class BookingUpdate(BaseModel):
    customer_name: str | None = None
    phone: str | None = None
    booking_date: str | None = None
    booking_time: str | None = None
    service_type: str | None = None
    service_name: str | None = None
    service_id: int | None = None

    package_id: int | None = None
    package_name: str | None = None
    package_price: int | None = None
    booking_type: str | None = None
    status: str | None = None


class BookingOut(BookingBase):
    id: int

    class Config:
        from_attributes = True
