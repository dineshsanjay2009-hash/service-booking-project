import os
from dotenv import load_dotenv
from sqlalchemy.orm import declarative_base

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# ✅ Completely disable DB (safe)
Base = declarative_base()

def get_db():
    yield None