from pydantic import BaseModel, EmailStr


# ---------- REGISTER ----------
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    phone: str   # ✅ ADDED
    password: str


# ---------- LOGIN ----------
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ---------- TOKEN RESPONSE ----------
class TokenResponse(BaseModel):
    access_token: str
    token_type: str