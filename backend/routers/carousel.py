from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.carousel_model import Carousel
from schemas.carousel_schema import CarouselOut

router = APIRouter(prefix="/carousel", tags=["Carousel"])


@router.get("/", response_model=list[CarouselOut])
def get_carousel(db: Session = Depends(get_db)):
    try:
        # DB irundha fetch pannum
        if db:
            data = db.query(Carousel).all()
            if data:
                return data

        # DB illa / empty na fallback data
        return [
            {"image": "https://via.placeholder.com/600x300?text=Service+1"},
            {"image": "https://via.placeholder.com/600x300?text=Service+2"},
            {"image": "https://via.placeholder.com/600x300?text=Service+3"},
        ]

    except Exception as e:
        print("Carousel error:", e)

        # error vandhaalum app crash aagakoodaadhu
        return [
            {"image": "https://via.placeholder.com/600x300?text=Fallback+1"},
            {"image": "https://via.placeholder.com/600x300?text=Fallback+2"},
        ]