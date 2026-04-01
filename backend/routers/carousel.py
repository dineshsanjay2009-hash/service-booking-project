from fastapi import APIRouter

router = APIRouter(prefix="/carousel", tags=["Carousel"])


@router.get("/")
def get_carousel():
    return [
        {"image": "https://via.placeholder.com/600x300?text=Service+1"},
        {"image": "https://via.placeholder.com/600x300?text=Service+2"},
        {"image": "https://via.placeholder.com/600x300?text=Service+3"},
    ]