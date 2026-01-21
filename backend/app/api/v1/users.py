from fastapi import APIRouter, Depends, HTTPException
from app.domain.schemas import UserUpdate, UserResponse
from app.api.dependencies import get_current_user, get_auth_service
from app.services.auth_services import AuthService
from app.infrastructure.models import User

router = APIRouter()

@router.patch("/me", response_model=UserResponse)
async def update_my_role(
    user_update: UserUpdate,  # 1. The Filter: Ensures only 'role' is sent
    current_user: User = Depends(get_current_user), # 2. The Guard: valid token required
    service: AuthService = Depends(get_auth_service)     # 3. The Logic
):
    """
    Updates the authenticated user's role (e.g. 'driver' or 'dispatcher').
    """
    updated_user = service.set_user_role(current_user.clerk_id, user_update.role)
    
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    return updated_user

@router.get("/me", response_model=UserResponse)
async def read_users_me(
    current_user: User = Depends(get_current_user)
):
    """
    Get current user details.
    """
    return current_user