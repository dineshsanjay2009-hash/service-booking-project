from pydantic import BaseModel
from typing import Optional

class BikeServiceCreate(BaseModel):
    title: str
    description: str
    price: int
    image: Optional[str] = None   # ✅ ADD THIS

class BikeServiceOut(BaseModel):
    id: int
    title: str
    description: str
    price: int
    image: Optional[str] = None

    class Config:
        from_attributes = True
