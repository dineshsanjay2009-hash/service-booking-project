from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.package_model import Package
from schemas.package_schema import (
    PackageCreate,
    PackageUpdate,
    PackageOut
)

router = APIRouter(
    prefix="/packages",
    tags=["Packages"]
)

# CREATE
@router.post("/", response_model=PackageOut)
def create_package(pkg: PackageCreate, db: Session = Depends(get_db)):
    new_pkg = Package(**pkg.dict())
    db.add(new_pkg)
    db.commit()
    db.refresh(new_pkg)
    return new_pkg

# READ ALL
@router.get("/", response_model=list[PackageOut])
def get_packages(db: Session = Depends(get_db)):
    return db.query(Package).order_by(Package.id.desc()).all()

# UPDATE
@router.put("/{package_id}", response_model=PackageOut)
def update_package(
    package_id: int,
    pkg: PackageUpdate,
    db: Session = Depends(get_db)
):
    db_pkg = db.query(Package).filter(Package.id == package_id).first()
    if not db_pkg:
        raise HTTPException(status_code=404, detail="Package not found")

    for key, value in pkg.dict(exclude_unset=True).items():
        setattr(db_pkg, key, value)

    db.commit()
    db.refresh(db_pkg)
    return db_pkg

# DELETE
@router.delete("/{package_id}")
def delete_package(package_id: int, db: Session = Depends(get_db)):
    pkg = db.query(Package).filter(Package.id == package_id).first()
    if not pkg:
        raise HTTPException(status_code=404, detail="Package not found")

    db.delete(pkg)
    db.commit()
    return {"message": "Package deleted successfully"}
