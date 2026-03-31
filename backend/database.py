import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Load .env file
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# TEMP FIX: allow app to run even if DB not available
engine = None
SessionLocal = None

if DATABASE_URL:
    try:
        engine = create_engine(
            DATABASE_URL,
            pool_pre_ping=True
        )

        SessionLocal = sessionmaker(
            autocommit=False,
            autoflush=False,
            bind=engine
        )
    except Exception as e:
        print("DB connection failed:", e)

Base = declarative_base()


# Dependency
def get_db():
    if SessionLocal is None:
        return None

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()