from pydantic import BaseModel

class CarouselCreate(BaseModel):
    image: str
    title: str
    description: str


class CarouselUpdate(BaseModel):
    image: str
    title: str
    description: str
