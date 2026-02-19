from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.carousel_model import Carousel
from schemas.carousel_schema import CarouselCreate, CarouselUpdate

router = APIRouter(
    prefix="/carousel",
    tags=["Carousel"]
)

# -------------------------
# GET - all carousel items
# -------------------------
@router.get("/")
def get_carousel(db: Session = Depends(get_db)):
    return db.query(Carousel).all()


# -------------------------
# POST - add carousel item
# -------------------------
@router.post("/")
def add_carousel(
    data: CarouselCreate,
    db: Session = Depends(get_db)
):
    item = Carousel(**data.dict())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


# -------------------------
# PUT - update carousel item
# -------------------------
@router.put("/{carousel_id}")
def update_carousel(
    carousel_id: int,
    data: CarouselUpdate,
    db: Session = Depends(get_db)
):
    item = db.query(Carousel).filter(Carousel.id == carousel_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Carousel not found")

    item.image = data.image
    item.title = data.title
    item.description = data.description

    db.commit()
    db.refresh(item)
    return item


# -------------------------
# DELETE - delete carousel
# -------------------------
@router.delete("/{carousel_id}")
def delete_carousel(
    carousel_id: int,
    db: Session = Depends(get_db)
):
    item = db.query(Carousel).filter(Carousel.id == carousel_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Carousel not found")

    db.delete(item)
    db.commit()
    return {"message": "Carousel deleted successfully"}
