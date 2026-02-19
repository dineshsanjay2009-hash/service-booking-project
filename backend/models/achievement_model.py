from sqlalchemy import Column, Integer, String
from database import Base

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    value = Column(String(50), nullable=False)
