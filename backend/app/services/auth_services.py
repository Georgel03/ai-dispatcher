from app.infrastructure.repositories.user_repository import UserRepository
from app.infrastructure.repositories.driver_repository import DriverRepository
from app.domain.schemas import UserCreate, DriverCreate, UserUpdate, OnboardingRequest, RoleEnum
from app.infrastructure.models import Driver, User

class AuthService:
    def __init__(self, user_repo: UserRepository, driver_repo: DriverRepository):
        self.user_repo = user_repo
        self.driver_repo = driver_repo

    def sync_user_from_clerk(self, user_data: UserCreate):
        # 1. Check if user exists
        existing_user = self.user_repo.get_by_clerk_id(user_data.clerk_id)
        if existing_user:
            return existing_user
        
        # 2. If not, create new
        return self.user_repo.create(user_data)

    def set_user_role(self, clerk_id: str, new_role: str):
        user = self.user_repo.get_by_clerk_id(clerk_id)
        if not user:
            return None
        
        updated_user = self.user_repo.update_role(clerk_id, new_role)
        return updated_user

    def complete_onboarding(self, auth_info: dict, data: OnboardingRequest) -> User :

        user = self.user_repo.get_by_clerk_id(auth_info["clerk_id"])
        if not user:
            user = UserCreate(
                clerk_id=auth_info["clerk_id"],
                email=auth_info["email"],
                username=data.full_name or auth_info["email"].split("@")[0],
                profile_picture_url=auth_info["profile_picture_url"],
                role=data.role
            )
            user = self.user_repo.create(user)
        else:
            user = self.user_repo.update_role(user.clerk_id, data.role)
        
        

        if data.role == RoleEnum.DRIVER:
            if not data.full_name or not data.phone:
                raise HTTPException(status_code=400, detail="Datele de șofer sunt incomplete")

            existing_driver = self.driver_repo.get_by_user_id(user.id)
            if not existing_driver:
                driver_data = DriverCreate(
                    user_id=user.id,
                    name=data.full_name,
                    phone=data.phone
                )
                self.driver_repo.create(driver_data)
            else:
                self.driver_repo.update_driver(user.id, data.full_name, data.phone)

        return user
                