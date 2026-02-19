from sqlalchemy import Column, Integer, String
from database import Base

class Carousel(Base):
    __tablename__ = "carousel"

    id = Column(Integer, primary_key=True, index=True)
    image = Column(String(255))
    title = Column(String(255))
    description = Column(String(255))
