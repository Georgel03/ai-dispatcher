from pydantic import BaseModel, ConfigDict
from enum import Enum
from typing import Optional
from app.infrastructure.models import TrailerType, TruckStatus, OrderStatus, DriverStatus
from datetime import datetime

class RoleEnum(str, Enum):
    PENDING = "pending"
    DISPATCHER = "dispatcher"
    DRIVER = "driver"
    ADMIN = "admin"

class UserCreate(BaseModel):
    clerk_id: str
    email: str
    username: Optional[str] = None
    profile_picture_url: Optional[str] = None
    role: Optional[RoleEnum] = RoleEnum.PENDING

class UserResponse(UserCreate):
    id: int
    clerk_id: str
    email: str
    username: Optional[str] = None
    profile_picture_url: Optional[str] = None
    role: Optional[RoleEnum] = None

    model_config = ConfigDict(from_attributes=True)


class UserUpdate(BaseModel):
    role: RoleEnum
    email: Optional[str] = None
    full_name: Optional[str] = None
    phone: Optional[str] = None


class DriverCreate(BaseModel):
    user_id: int
    name: str
    phone: str

class OnboardingRequest(BaseModel):
    role: RoleEnum
    full_name: Optional[str] = None
    phone: Optional[str] = None

class LocationInput(BaseModel):
    latitude: float
    longitude: float

class TruckCreate(BaseModel):
    plate_number: str
    model: str
    own_weight_kg: int
    status: Optional[TruckStatus] = TruckStatus.AVAILABLE
    location: Optional[LocationInput] = None

   
    driver_id: Optional[int] = None  
    trailer_id: Optional[int] = None  


class TruckResponse(BaseModel):
    id: int
    plate_number: str
    model: str
    own_weight_kg: int
    status: TruckStatus

    
    driver_id: Optional[int] = None
    trailer_id: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)


class TruckUpdate(BaseModel):
    plate_number: Optional[str] = None
    model: Optional[str] = None
    own_weight_kg: Optional[int] = None
    status: Optional[TruckStatus] = None
    location: Optional[LocationInput] = None
    driver_id: Optional[int] = None
    trailer_id: Optional[int] = None


class TrailerCreate(BaseModel):
    plate_number: str
    type: TrailerType
    capacity_kg: int
    own_weight_kg: int
    parked_location: Optional[LocationInput] = None

class TrailerUpdate(BaseModel):
    plate_number: Optional[str] = None
    type: Optional[TrailerType] = None
    capacity_kg: Optional[int] = None
    own_weight_kg: Optional[int] = None
    parked_location: Optional[LocationInput] = None


class TrailerResponse(BaseModel):
    id: int
    plate_number: str
    type: TrailerType
    capacity_kg: int
    own_weight_kg: int
    
    model_config = ConfigDict(from_attributes=True)

class DriverUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None

class DriverResponse(BaseModel):
    id: int
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None

    status: Optional[str] = None
    assigned_truck: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class OrderBase(BaseModel):
    description: str
    weight_kg: int
    required_trailer_type: Optional[str] = None
    status: Optional[OrderStatus] = OrderStatus.PENDING


class OrderCreate(OrderBase):
    pickup_lat: float
    pickup_lng: float
    delivery_lat: float
    delivery_lng: float
    pickup_deadline: Optional[datetime] = None
    delivery_deadline: Optional[datetime] = None

class OrderUpdate(BaseModel):
    description: Optional[str] = None
    weight_kg: Optional[int] = None
    required_trailer_type: Optional[str] = None
    status: Optional[OrderStatus] = None
    truck_id: Optional[int] = None

    pickup_lat: Optional[float] = None
    pickup_lng: Optional[float] = None
    delivery_lat: Optional[float] = None
    delivery_lng: Optional[float] = None
    pickup_deadline: Optional[datetime] = None
    delivery_deadline: Optional[datetime] = None

class OrderResponse(OrderBase):
    id: int
    pickup_deadline: Optional[datetime] = None
    delivery_deadline: Optional[datetime] = None
    created_at: datetime
    truck_id: Optional[int] = None

    # --- Adăugăm coordonatele extrase pentru Frontend ---
    pickup_lat: Optional[float] = None
    pickup_lng: Optional[float] = None
    delivery_lat: Optional[float] = None
    delivery_lng: Optional[float] = None
    
    model_config = ConfigDict(from_attributes=True)


class FleetAssembleRequest(BaseModel):
    driver_id: int
    truck_id: int
    trailer_id: int

class FleetUpdateRequest(BaseModel):
    driver_id: int
    truck_id: Optional[int] = None
    trailer_id: Optional[int] = None


    