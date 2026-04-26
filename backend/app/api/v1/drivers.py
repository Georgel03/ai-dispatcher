from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from typing import List

from app.infrastructure.database import get_db
from app.domain.schemas import DriverResponse, DriverUpdate
from app.infrastructure.repositories.driver_repository import DriverRepository
from app.services.driver_service import DriverService
from app.api.dependencies import require_dispatcher_role

router = APIRouter()
def get_driver_service(db: Session = Depends(get_db)):
    repository = DriverRepository(db)
    return DriverService(repository)

@router.get("", response_model=List[DriverResponse])
def get_drivers(
    service: DriverService = Depends(get_driver_service),
    current_user = Depends(require_dispatcher_role) # Gardianul nostru de roluri
):
    """
    Returnează o listă cu toți șoferii.
    """
    return service.get_all_drivers()

@router.patch("/{driver_id}", response_model=DriverResponse)
def update_driver(
    driver_id: int,
    driver_update: DriverUpdate,
    service: DriverService = Depends(get_driver_service),
    current_user = Depends(require_dispatcher_role) # Gardianul nostru de roluri
):
    """
    Actualizează un șofer în DB.
    """
    updated_driver = service.update_driver(driver_id, driver_update)
    if not updated_driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    return updated_driver

@router.delete("/{driver_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_driver(
    driver_id: int, 
    service: DriverService = Depends(get_driver_service),
    current_user = Depends(require_dispatcher_role) # Gardianul nostru de roluri
):
    """
    Șterge un șofer din DB și contul său din Clerk.
    """

    success = service.delete_driver(driver_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Driver not found")
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)