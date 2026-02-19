from pydantic import BaseModel

class PackageBase(BaseModel):
    title: str
    price: int
    features: list[str]

class PackageCreate(PackageBase):
    pass

class PackageUpdate(BaseModel):
    title: str | None = None
    price: int | None = None
    features: list[str] | None = None

class PackageOut(PackageBase):
    id: int

    class Config:
        from_attributes = True
