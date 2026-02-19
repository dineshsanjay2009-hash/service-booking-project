from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.contact_model import ContactMessage

router = APIRouter(
    prefix="/contact",
    tags=["Contact Page"]
)

# -------- GET ALL MESSAGES --------
@router.get("/")
def get_messages(db: Session = Depends(get_db)):
    return db.query(ContactMessage).all()


# -------- POST MESSAGE --------
@router.post("/")
def create_message(data: dict, db: Session = Depends(get_db)):
    message = ContactMessage(
        name=data.get("name"),
        email=data.get("email"),
        message=data.get("message")
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


# -------- DELETE MESSAGE --------
@router.delete("/{message_id}")
def delete_message(message_id: int, db: Session = Depends(get_db)):
    message = db.query(ContactMessage).filter(
        ContactMessage.id == message_id
    ).first()

    if not message:
        return {"error": "Message not found"}

    db.delete(message)
    db.commit()
    return {"message": "Deleted successfully"}
