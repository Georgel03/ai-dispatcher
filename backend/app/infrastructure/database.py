from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Luăm URL-ul bazei de date din variabilele de mediu
# Dacă nu există (rulezi local fără docker), folosim un default
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:adminpass@db:5432/dispatcher_db")

# Creăm motorul de conectare
engine = create_engine(DATABASE_URL)

# Creăm sesiunea (fabrica de conexiuni)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Clasa de bază pe care o moștenesc toate modelele (User, Driver, Truck, etc.)
Base = declarative_base()

# Funcție utilitară pentru a obține o sesiune DB (folosită în main.py)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()