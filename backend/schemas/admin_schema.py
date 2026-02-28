from pydantic import BaseModel

class AdminLogin(BaseModel):
    email: str
    password: str 

class ChangePassword(BaseModel):
    current_password: str
    new_password: str