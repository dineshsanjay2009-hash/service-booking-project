from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.achievement_model import Achievement
from schemas.achievement_schema import (
    AchievementCreate,
    AchievementUpdate,
    AchievementOut
)

router = APIRouter(
    prefix="/achievements",
    tags=["Achievements"]
)

# -------------------------
# GET ALL
# -------------------------
@router.get("/", response_model=list[AchievementOut])
def get_achievements(db: Session = Depends(get_db)):
    return db.query(Achievement).order_by(Achievement.id).all()

# -------------------------
# CREATE
# -------------------------
@router.post("/", response_model=AchievementOut)
def create_achievement(
    achievement: AchievementCreate,
    db: Session = Depends(get_db)
):
    new_achievement = Achievement(**achievement.dict())
    db.add(new_achievement)
    db.commit()
    db.refresh(new_achievement)
    return new_achievement

# -------------------------
# UPDATE
# -------------------------
@router.put("/{achievement_id}", response_model=AchievementOut)
def update_achievement(
    achievement_id: int,
    achievement: AchievementUpdate,
    db: Session = Depends(get_db)
):
    db_achievement = db.query(Achievement).filter(
        Achievement.id == achievement_id
    ).first()

    if not db_achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")

    for key, value in achievement.dict(exclude_unset=True).items():
        setattr(db_achievement, key, value)

    db.commit()
    db.refresh(db_achievement)
    return db_achievement

# -------------------------
# DELETE
# -------------------------
@router.delete("/{achievement_id}")
def delete_achievement(
    achievement_id: int,
    db: Session = Depends(get_db)
):
    achievement = db.query(Achievement).filter(
        Achievement.id == achievement_id
    ).first()

    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")

    db.delete(achievement)
    db.commit()
    return {"message": "Achievement deleted successfully"}
