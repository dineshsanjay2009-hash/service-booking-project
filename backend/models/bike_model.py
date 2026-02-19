from sqlalchemy import Column, Integer, String, Text
from database import Base

class BikeService(Base):
    __tablename__ = "bike_services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)      # ✅ length
    description = Column(Text, nullable=False)
    price = Column(Integer, nullable=False)
    image = Column(String(255), nullable=True)       # ✅ length
    