from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from database import get_db
from models.admin_model import Admin
from schemas.admin_schema import ChangePassword
from core.security import (
    verify_password,
    create_access_token,
    hash_password,
    get_current_user,
)

router = APIRouter(prefix="/api/admin", tags=["Admin Auth"])


# ===================== LOGIN =====================

@router.post("/login")
def admin_login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    admin = db.query(Admin).filter(
        Admin.email == form_data.username
    ).first()

    if not admin:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(form_data.password, admin.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        data={
            "sub": admin.email,   # store email in token
            "role": "admin"
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# ===================== CHANGE PASSWORD =====================

@router.put("/change-password")
def change_password(
    data: ChangePassword,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    # 🔥 extract email from token payload
    email = user.get("sub")

    admin = db.query(Admin).filter(Admin.email == email).first()

    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")

    if not verify_password(data.current_password, admin.password):
        raise HTTPException(status_code=400, detail="Current password incorrect")

    admin.password = hash_password(data.new_password)
    db.commit()

    return {"message": "Password updated successfully"}