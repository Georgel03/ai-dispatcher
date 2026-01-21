from pydantic import BaseModel, ConfigDict
from enum import Enum
from typing import Optional

class UserCreate(BaseModel):
    clerk_id: str
    email: str
    username: Optional[str] = None
    profile_picture_url: Optional[str] = None
    role: str = "driver"

class UserResponse(UserCreate):
    id: int
    model_config = ConfigDict(from_attributes=True) # Allows mapping from ORM objects


class RoleEnum(str, Enum):
    DISPATCHER = "dispatcher"
    DRIVER = "driver"
    ADMIN = "admin"

# 2. Add the Update Schema (The "Filter")
class UserUpdate(BaseModel):
    role: RoleEnum