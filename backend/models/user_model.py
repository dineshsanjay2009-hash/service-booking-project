from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    phone = Column(String(15), unique=True, index=True, nullable=False)  # ✅ UNIQUE ADDED
    password = Column(String(255), nullable=False)

    bookings = relationship(
        "Booking",
        back_populates="user",
        cascade="all, delete"
    )