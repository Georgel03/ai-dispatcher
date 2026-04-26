from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import jwt # Make sure you have pyjwt installed

from app.infrastructure.database import get_db
from app.infrastructure.models import User
from app.infrastructure.repositories.user_repository import UserRepository
from app.infrastructure.repositories.driver_repository import DriverRepository
from app.services.auth_services import AuthService
from app.core.config import settings 

# Define the Security Scheme
security = HTTPBearer()

# 1. Inject DB into Repo
def get_user_repository(db: Session = Depends(get_db)) -> UserRepository:
    return UserRepository(db)

def get_driver_repository(db: Session = Depends(get_db)) -> DriverRepository:
    return DriverRepository(db)

# 2. Inject Repos into Service
def get_auth_service(user_repo: UserRepository = Depends(get_user_repository), driver_repo: DriverRepository = Depends(get_driver_repository)) -> AuthService:
    return AuthService(user_repo, driver_repo)

# 3. The Gatekeeper (Get Current User)
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    repo: UserRepository = Depends(get_user_repository)
):
    token = credentials.credentials
    
    try:
       
        public_key = settings.CLERK_PEM_PUBLIC_KEY.replace("\\n", "\n")
        
        payload = jwt.decode(
            token, 
            key=public_key, 
            algorithms=["RS256"],
            options={"verify_exp": True} # Enforce expiration check
        )

        user_id: str = payload.get("sub")
        
        if user_id is None:
             raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: missing user_id",
            )

        # Now use the INJECTED repo (repo is already connected to DB)
        user = repo.get_by_clerk_id(user_id)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: missing user_id",
            )
            
        return user # Returns the entire User model, so you can access user.role

    except jwt.PyJWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",
        )

def get_clerk_auth(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        public_key = settings.CLERK_PEM_PUBLIC_KEY.replace("\\n", "\n")
        
        payload = jwt.decode(
            token, 
            key=public_key, 
            algorithms=["RS256"],
            options={"verify_exp": True} 
        )

        return {
            "clerk_id" : payload.get("sub"),
            "email": payload.get("email"),
            "profile_picture_url": payload.get("profile_picture_url"),
            "role": payload.get("role")
        }

    except jwt.PyJWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",
        )


def require_dispatcher_role(current_user: User = Depends(get_current_user)):
    if current_user.role not in ["admin", "dispatcher"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to perform this action"
        )
    return current_user

def require_admin_role(current_user: User = Depends(get_current_user)):
    if current_user.role not in ["admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to perform this action"
        )
    return current_user