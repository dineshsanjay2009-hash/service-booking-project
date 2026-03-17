from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.carousel_model import Carousel
from schemas.carousel_schema import CarouselOut

router = APIRouter(prefix="/carousel", tags=["Carousel"])

@router.get("/", response_model=list[CarouselOut])
def get_carousel(db: Session = Depends(get_db)):
    return db.query(Carousel).all()