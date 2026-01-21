from app.infrastructure.repositories.user_repository import UserRepository
from app.domain.schemas import UserCreate

class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

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