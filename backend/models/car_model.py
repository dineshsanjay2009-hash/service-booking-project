from sqlalchemy import Column, Integer, String
from database import Base

class CarService(Base):
    __tablename__ = "car_services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    slug = Column(String(255))
    description = Column(String(500))
    price = Column(String(100))
    image = Column(String(500))
