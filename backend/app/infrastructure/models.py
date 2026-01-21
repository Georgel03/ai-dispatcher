from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum, Boolean
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from app.infrastructure.database import Base
import enum
from datetime import datetime

# --- ENUMS ---
class DriverStatus(str, enum.Enum):
    ACTIVE = "active"
    RESTING = "resting"
    OFF_DUTY = "off_duty"

class TrailerType(str, enum.Enum):
    PRELATA = "prelata"       # General cargo
    FRIGO = "frigorific"      # Temperatură controlată
    CISTERNA = "cisterna"     # Lichide
    PLATFORMA = "platforma"   # Oversized/Container

class OrderStatus(str, enum.Enum):
    PENDING = "pending"       # Comandă nouă, nealocată
    ASSIGNED = "assigned"     # Are șofer, e pe drum
    COMPLETED = "completed"   # Livrată
    CANCELLED = "cancelled"

# --- UTILIZATORI (LOGIN) ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    clerk_id = Column(String, unique=True, index=True)  # ID unic pentru fiecare utilizator
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    profile_picture_url = Column(String, nullable=True)  # URL or file path
    role = Column(String, default="admin")  # ex: admin, dispatcher, driver

# --- 1. TABEL SEMIREMORCĂ (NOU) ---
class Semitrailer(Base):
    __tablename__ = "semitrailers"

    id = Column(Integer, primary_key=True, index=True)
    plate_number = Column(String, unique=True, index=True) # Ex: B 55 RMC
    
    # Caracteristici tehnice
    type = Column(Enum(TrailerType), default=TrailerType.PRELATA)
    capacity_kg = Column(Integer)       # Câtă marfă poate duce (ex: 24000 kg)
    own_weight_kg = Column(Integer)     # Masa proprie (tara) (ex: 7000 kg)
    
    # Locație statică (doar când e parcată/decuplată)
    parked_location = Column(Geometry(geometry_type='POINT', srid=4326), nullable=True)

    # RELAȚIA: Această remorcă este atașată la camionul X?
    truck_id = Column(Integer, ForeignKey("trucks.id"), unique=True, nullable=True)
    
    # Relația inversă pentru ORM
    truck = relationship("Truck", back_populates="semitrailer")


# --- 2. TABEL CAMIOANE (Actualizat) ---
class Truck(Base):
    __tablename__ = "trucks"

    id = Column(Integer, primary_key=True, index=True)
    plate_number = Column(String, unique=True, index=True)
    model = Column(String)
    own_weight_kg = Column(Integer)  # Masa proprie a camionului (tara)
    
    # Relația cu Șoferul (Un camion are max 1 șofer activ)
    driver = relationship("Driver", back_populates="truck", uselist=False)

    # Relația cu Semiremorca (Un camion are max 1 remorcă atașată)
    semitrailer = relationship("Semitrailer", back_populates="truck", uselist=False)


# --- 3. TABEL ȘOFERI (Rămâne la fel) ---
class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone = Column(String)
    status = Column(Enum(DriverStatus), default=DriverStatus.OFF_DUTY)
    
    # Locația șoferului (care e de fapt GPS-ul telefonului/tabletei din cabină)
    location = Column(Geometry(geometry_type='POINT', srid=4326), nullable=True)

    truck_id = Column(Integer, ForeignKey("trucks.id"), nullable=True, unique=True)
    truck = relationship("Truck", back_populates="driver")


# --- 4. TABEL COMENZI ---
class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    weight_kg = Column(Integer)

    # Tip remorcă necesar (Constrângere pentru AI)
    required_trailer_type = Column(Enum(TrailerType), nullable=True)

    # COORDONATE (Esențiale pentru Hartă și AI)
    pickup_location = Column(Geometry(geometry_type='POINT', srid=4326))
    delivery_location = Column(Geometry(geometry_type='POINT', srid=4326))

    # TIMP (Time Windows pentru AI)
    pickup_deadline = Column(DateTime, nullable=True)  # Până când trebuie ridicată?
    delivery_deadline = Column(DateTime, nullable=True) # Până când trebuie livrată?

    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Cine execută comanda?
    assigned_driver_id = Column(Integer, ForeignKey("drivers.id"), nullable=True)
    driver = relationship("Driver")