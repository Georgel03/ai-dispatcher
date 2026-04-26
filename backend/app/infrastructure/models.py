from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum, Boolean, JSON
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
    IN_TRANSIT = "in_transit" # Pe drum
    COMPLETED = "completed"   # Livrată
    CANCELLED = "cancelled"

class TruckStatus(str, enum.Enum):
    AVAILABLE = "available"   # Disponibil pentru noi comenzi
    IN_TRANSIT = "in_transit"     # Pe drum cu o comandă
    MAINTENANCE = "maintenance" # În service

# --- 0. UTILIZATORI (LOGIN) ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)

    clerk_id = Column(String, unique=True, index=True)  # ID unic pentru fiecare utilizator
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    profile_picture_url = Column(String, nullable=True)  # URL or file path
    role = Column(String, default="admin")  # ex: admin, dispatcher, driver
    
# --- 1. TABEL DRIVER ---
class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, index=True)
    phone = Column(String)
    status = Column(Enum(DriverStatus), default=DriverStatus.OFF_DUTY, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"), unique=True)  # Fiecare șofer are un cont de utilizator asociat
    user = relationship("User")

    # Relația inversă 1-la-1 (Camionul la care este asignat acum)
    truck = relationship("Truck", back_populates="driver", uselist=False)

    # Relația 1-la-1 cu datele de Tahograf (Legile Europene)
    hos_data = relationship("DriverHOS", back_populates="driver", uselist=False, cascade="all, delete-orphan")


# --- 1.1. TABEL TAHOGRAF (Reguli UE - PENTRU AI) ---
class DriverHOS(Base):
    """
    Hours of Service (HOS) - Monitorizează timpii de condus pentru AI.
    Conform regulamentului CE 561/2006.
    """
    __tablename__ = "driver_hos"

    id = Column(Integer, primary_key=True, index=True)
    driver_id = Column(Integer, ForeignKey("drivers.id"), unique=True)
    
    # Date esențiale pentru deciziile AI-ului
    continuous_driving_minutes = Column(Integer, default=0) # Max 270 (4.5 ore)
    daily_driving_minutes = Column(Integer, default=0)      # Max 540 (9 ore) sau 600 (10 ore)
    weekly_driving_minutes = Column(Integer, default=0)     # Max 3360 (56 ore)
    
    last_rest_start = Column(DateTime, nullable=True)       # Când a început ultima pauză
    is_on_weekly_rest = Column(Boolean, default=False)      # E în pauza de 45h?
    
    driver = relationship("Driver", back_populates="hos_data")

# --- 2. TABEL CAMIOANE (HUB-UL CENTRAL) ---
class Truck(Base):
    __tablename__ = "trucks"

    id = Column(Integer, primary_key=True, index=True)
    plate_number = Column(String, unique=True, index=True)
    model = Column(String)
    own_weight_kg = Column(Integer)
    status = Column(Enum(TruckStatus), default=TruckStatus.AVAILABLE)
    
    # Tracker-ul GPS este instalat pe camion
    location = Column(Geometry(geometry_type='POINT', srid=4326), nullable=True)
    
    # Aici rezolvăm dependențele: Camionul decide ce Șofer și ce Remorcă "ține"
    driver_id = Column(Integer, ForeignKey("drivers.id"), unique=True, nullable=True)
    trailer_id = Column(Integer, ForeignKey("trailers.id"), unique=True, nullable=True)

    driver = relationship("Driver", back_populates="truck")
    trailer = relationship("Trailer", back_populates="truck")
    orders = relationship("Order", back_populates="truck")


# --- 3. TABEL SEMIREMORCĂ (NOU) ---
class Trailer(Base):
    __tablename__ = "trailers"

    id = Column(Integer, primary_key=True, index=True)
    plate_number = Column(String, unique=True, index=True) # Ex: B 55 RMC
    
    # Caracteristici tehnice
    type = Column(Enum(TrailerType), default=TrailerType.PRELATA)
    capacity_kg = Column(Integer)       # Câtă marfă poate duce (ex: 24000 kg)
    own_weight_kg = Column(Integer)     # Masa proprie (tara) (ex: 7000 kg)
    
    # Locație statică (doar când e parcată/decuplată)
    parked_location = Column(Geometry(geometry_type='POINT', srid=4326), nullable=True)

    # Relația inversă 1-la-1
    truck = relationship("Truck", back_populates="trailer", uselist=False)

    @property
    def current_location(self):
        """
        Returnează locația curentă a remorcii.
        Dacă e cuplată la camion, returnează locația camionului.
        Dacă e decuplată, returnează locația parcată.
        """
        if self.truck and self.truck.location:
            return self.truck.location
        return self.parked_location

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
    
    # Comanda este asignată fizic unui Camion, nu unui Șofer
    # AI-ul va uni (Order -> Truck <- Driver & Trailer)
    truck_id = Column(Integer, ForeignKey("trucks.id"), nullable=True)
    truck = relationship("Truck", back_populates="orders")

    route_geometry = Column(JSON, nullable=True)

    current_waypoint_index = Column(Integer, default=0) 