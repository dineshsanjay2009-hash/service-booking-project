from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from database import Base


class Booking(Base):
    __tablename__ = "bookings"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "service_id",
            "booking_date",
            "booking_time",
            name="unique_booking_constraint"
        ),
    )

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    customer_name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)

    booking_date = Column(String(20), nullable=False)
    booking_time = Column(String(20), nullable=False)

    service_type = Column(String(50), nullable=False)
    service_name = Column(String(100), nullable=False)
    service_id = Column(Integer, nullable=False)

    package_id = Column(Integer, nullable=True)
    package_name = Column(String(100), nullable=True)
    package_price = Column(Integer, nullable=True)

    total_amount = Column(Integer, nullable=True)

    booking_type = Column(String(50), default="service")

    # 🔥 UPDATED STATUS DEFAULT
    status = Column(String(50), default="pending_payment")

    # 🔥 NEW FIELDS (Payment)
    payment_id = Column(String(100), nullable=True)
    payment_method = Column(String(50), nullable=True)

    user = relationship("User", back_populates="bookings")