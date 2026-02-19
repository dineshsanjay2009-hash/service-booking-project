from pydantic import BaseModel
from typing import Optional

class CarServiceCreate(BaseModel):
    title: str
    description: str
    price: Optional[int] = None
    image: Optional[str] = None

class CarServiceOut(BaseModel):
    id: int
    title: str
    description: str
    price: Optional[int] = None
    image: Optional[str] = None

    class Config:
        from_attributes = True  # ✅ Pydantic v2
