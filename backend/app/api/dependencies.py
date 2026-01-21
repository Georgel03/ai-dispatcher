from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import jwt # Make sure you have pyjwt installed

from app.infrastructure.database import get_db
from app.infrastructure.repositories.user_repository import UserRepository
from app.services.auth_services import AuthService
from app.core.config import settings 

# Define the Security Scheme
security = HTTPBearer()

# 1. Inject DB into Repo
def get_user_repository(db: Session = Depends(get_db)) -> UserRepository:
    return UserRepository(db)

# 2. Inject Repo into Service
def get_auth_service(repo: UserRepository = Depends(get_user_repository)) -> AuthService:
    return AuthService(repo)


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
        
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found in local database",
            )
            
        return user # Returns the entire User model, so you can access user.role

    except jwt.PyJWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",
        )