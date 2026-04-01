from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from database import Base

from routers import auth
from routers import services
from routers import packages
from routers import achievements
from routers import contact
from routers import bookings
from routers import dashboard
from routers import bike_services
from routers import admin_auth
from routers import payment
from routers.carousel import router as carousel_router

import models.user_model
import models.bike_model
import models.car_model
import models.package_model
import models.achievement_model
import models.contact_model
import models.booking_model
import models.carousel_model


app = FastAPI(title="ServiceHub Backend")

# ✅ FIXED CORS (IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://service-booking-project.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# =============================
# ROUTERS
# =============================

app.include_router(auth.router, prefix="/api")
app.include_router(services.router, prefix="/api")
app.include_router(bike_services.router, prefix="/api")
app.include_router(packages.router, prefix="/api")
app.include_router(achievements.router, prefix="/api")
app.include_router(contact.router, prefix="/api")
app.include_router(bookings.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
app.include_router(carousel_router, prefix="/api")

app.include_router(admin_auth.router)
app.include_router(payment.router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Backend running"}

# ❌ DB create remove pannirukom (correct)
# Base.metadata.create_all(bind=engine)