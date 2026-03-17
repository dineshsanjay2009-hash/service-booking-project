from pydantic import BaseModel

class CarouselBase(BaseModel):
    image: str
    title: str | None = None

class CarouselOut(CarouselBase):
    id: int

    class Config:
        from_attributes = True