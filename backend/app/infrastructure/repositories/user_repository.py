from sqlalchemy.orm import Session
from app.infrastructure.models import User
from app.domain.schemas import UserCreate

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_clerk_id(self, clerk_id: str):
        return self.db.query(User).filter(User.clerk_id == clerk_id).first()

    def create(self, user: UserCreate) -> User:
        db_user = User(
            clerk_id=user.clerk_id,
            email=user.email,
            username=user.username,
            profile_picture_url=user.profile_picture_url,
            role=user.role
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user
    
    def update_role(self, clerk_id: str, role: str):
        user = self.get_by_clerk_id(clerk_id)
        if not user:
            return None
        user.role = role
        self.db.commit()
        self.db.refresh(user)
        return user