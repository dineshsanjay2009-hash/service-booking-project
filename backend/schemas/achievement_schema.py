from pydantic import BaseModel

class AchievementBase(BaseModel):
    title: str
    value: str

class AchievementCreate(AchievementBase):
    pass

class AchievementUpdate(BaseModel):
    title: str | None = None
    value: str | None = None

class AchievementOut(AchievementBase):
    id: int

    class Config:
        from_attributes = True
