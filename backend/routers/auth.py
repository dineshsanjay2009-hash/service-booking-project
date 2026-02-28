from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models.user_model import User
from schemas.auth_schema import UserRegister, UserLogin
from core.security import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

# ---------- REGISTER ----------
@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserRegister, db: Session = Depends(get_db)):

    # 🔍 Check existing email
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # 🔍 Optional: prevent duplicate phone
    existing_phone = db.query(User).filter(User.phone == user.phone).first()
    if existing_phone:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone number already registered"
        )

    # ✅ Create new user (PHONE ADDED)
    new_user = User(
        name=user.name,
        email=user.email,
        phone=user.phone,  # ✅ ADDED
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


# ---------- LOGIN ----------
@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # ✅ JWT TOKEN
    access_token = create_access_token(
        data={
            "sub": str(db_user.id),
            "email": db_user.email
        }
    )

    # ✅ PHONE RETURN ADDED
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "id": db_user.id,
        "email": db_user.email,
        "name": db_user.name,
        "phone": db_user.phone   # ✅ ADDED
    }