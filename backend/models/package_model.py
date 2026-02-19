from sqlalchemy import Column, Integer, String, JSON
from database import Base

class Package(Base):
    __tablename__ = "packages"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    price = Column(Integer, nullable=False)
    features = Column(JSON, nullable=False)
