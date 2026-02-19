from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)

    # ✅ IMPORTANT: ForeignKey added
    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=True
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

    booking_type = Column(String(50), default="service")
    status = Column(String(50), default="pending")

    # ✅ Relationship with User
    user = relationship("User", back_populates="bookings")
