from fastapi import APIRouter, Depends, HTTPException
from app.domain.schemas import UserUpdate, UserResponse
from app.api.dependencies import get_current_user, get_auth_service, get_clerk_auth
from app.services.auth_services import AuthService
from app.infrastructure.models import User
from app.infrastructure.models import Driver
from app.domain.schemas import OnboardingRequest

router = APIRouter()

@router.post("/onboard", response_model=UserResponse)
async def finalize_onboarding(
    request_data: OnboardingRequest,
    auth_info: dict = Depends(get_clerk_auth),
    service: AuthService = Depends(get_auth_service)
):
    """
    Punct unic pentru selectare rol (Dispatcher) SAU finalizare formular (Driver).
    """
    return service.complete_onboarding(auth_info, request_data)

@router.get("/me", response_model=UserResponse)
async def read_users_me(
    current_user: User = Depends(get_current_user)
):
    """
    Get current user details.
    """
    return current_user