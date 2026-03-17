from sqlalchemy import Column, Integer, String
from database import Base   # ✅ IMPORTANT (core.database illa)

class Carousel(Base):
    __tablename__ = "carousel"

    id = Column(Integer, primary_key=True, index=True)
    image = Column(String, nullable=False)
    title = Column(String, nullable=True)