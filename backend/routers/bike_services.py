from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db   # ✅ CORRECT
from models.bike_model import BikeService
from schemas.bike_schema import BikeServiceCreate, BikeServiceOut

router = APIRouter(
    prefix="/services/bike",
    tags=["Bike Services"]
)


# ✅ GET all bike services
@router.get("/", response_model=list[BikeServiceOut])
def get_bike_services(db: Session = Depends(get_db)):
    return db.query(BikeService).all()


# ✅ ADD bike service
@router.post("/", response_model=BikeServiceOut)
def add_bike_service(service: BikeServiceCreate, db: Session = Depends(get_db)):
    bike_service = BikeService(
        title=service.title,
        description=service.description,
        price=service.price,
        image=service.image
    )
    db.add(bike_service)
    db.commit()
    db.refresh(bike_service)
    return bike_service


# 🔥 UPDATE bike service
@router.put("/{service_id}", response_model=BikeServiceOut)
def update_bike_service(
    service_id: int,
    service: BikeServiceCreate,
    db: Session = Depends(get_db)
):
    existing = db.query(BikeService).filter(BikeService.id == service_id).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Bike service not found")

    existing.title = service.title
    existing.description = service.description
    existing.price = service.price
    existing.image = service.image

    db.commit()
    db.refresh(existing)
    return existing


# 🔥 DELETE bike service
@router.delete("/{service_id}")
def delete_bike_service(service_id: int, db: Session = Depends(get_db)):
    existing = db.query(BikeService).filter(BikeService.id == service_id).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Bike service not found")

    db.delete(existing)
    db.commit()
    return {"message": "Bike service deleted successfully"}
