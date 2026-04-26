import requests
from fastapi import HTTPException
from app.core.config import settings
from app.infrastructure.repositories.user_repository import UserRepository
from app.infrastructure.repositories.driver_repository import DriverRepository
from app.domain.schemas import UserCreate, DriverCreate, OnboardingRequest, RoleEnum
from app.infrastructure.models import User, Driver


class AuthService:
    def __init__(self, user_repo: UserRepository, driver_repo: DriverRepository):
        self.user_repo = user_repo
        self.driver_repo = driver_repo

    def sync_user_from_clerk(self, user_data: UserCreate):
        
        existing_user = self.user_repo.get_by_clerk_id(user_data.clerk_id)
        
        if existing_user:
            print(f"User {user_data.email} already in DB. Skipping initial insert.")
            return existing_user
        
        return self.user_repo.create(user_data)

    def set_user_role(self, clerk_id: str, new_role: str):
        user = self.user_repo.get_by_clerk_id(clerk_id)
        if not user:
            return None
        
        updated_user = self.user_repo.update_role(clerk_id, new_role)
        return updated_user

    def complete_onboarding(self, auth_info: dict, data: OnboardingRequest):
        """Apelat de Frontend la alegerea rolului"""
        clerk_id = auth_info["clerk_id"]
        
        # 1. Update DB Local
        user = self.user_repo.update_user_onboarding(
            clerk_id, 
            data.role.value, 
            data.full_name
        )

        # 2. Dacă e Driver, creăm profilul extins
        if data.role == RoleEnum.DRIVER:
            self.driver_repo.upsert_driver(user.id, data.full_name, data.phone)

        # 3. Sincronizare Metadata Clerk (Sursa pentru JWT)
        self._sync_clerk_metadata(clerk_id, data.role.value)
        return user
                
    def _sync_clerk_metadata(self, clerk_id: str, role: str):
        url = f"https://api.clerk.com/v1/users/{clerk_id}/metadata"
        headers = {
            "Authorization": f"Bearer {settings.CLERK_SECRET_KEY}",
            "Content-Type": "application/json"
        }
        requests.patch(url, json={"public_metadata": {"role": role}}, headers=headers)