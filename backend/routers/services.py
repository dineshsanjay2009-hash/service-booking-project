from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.car_model import CarService
from schemas.car_schema import CarServiceCreate, CarServiceOut

router = APIRouter(
    prefix="/services/car",
    tags=["Car Services"]
)


@router.get("/", response_model=list[CarServiceOut])
def get_car_services(db: Session = Depends(get_db)):
    return db.query(CarService).all()

@router.post("/", response_model=CarServiceOut)
def add_car_service(service: CarServiceCreate, db: Session = Depends(get_db)):
    new_service = CarService(**service.dict())
    db.add(new_service)
    db.commit()
    db.refresh(new_service)
    return new_service

@router.put("/{service_id}", response_model=CarServiceOut)
def update_car_service(
    service_id: int,
    service: CarServiceCreate,
    db: Session = Depends(get_db)
):
    db_service = db.query(CarService).filter(CarService.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Car service not found")

    for key, value in service.dict().items():
        setattr(db_service, key, value)

    db.commit()
    db.refresh(db_service)
    return db_service

@router.delete("/{service_id}")
def delete_car_service(service_id: int, db: Session = Depends(get_db)):
    db_service = db.query(CarService).filter(CarService.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Car service not found")

    db.delete(db_service)
    db.commit()
    return {"message": "Car service deleted"}
