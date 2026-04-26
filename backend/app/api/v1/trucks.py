from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from typing import List

from app.infrastructure.database import get_db
from app.domain.schemas import TruckCreate, TruckResponse, TruckUpdate
from app.infrastructure.repositories.truck_repository import TruckRepository
from app.api.dependencies import get_clerk_auth # Refolosim gardianul pentru a proteja ruta

router = APIRouter()

# Dependency pentru repository
def get_truck_repo(db: Session = Depends(get_db)):
    return TruckRepository(db)

@router.post("/", response_model=TruckResponse)
def create_truck(
    truck_in: TruckCreate,
    repo: TruckRepository = Depends(get_truck_repo),
    auth_info: dict = Depends(get_clerk_auth) # Doar userii logati pot adauga camioane
):
    """
    Crează un nou camion în sistem (doar pentru admini/dispeceri).
    """
    # Aici poți adăuga pe viitor o extra-verificare ca doar role=='admin' să poată face asta
    try:
        new_truck = repo.create(truck_in)
        return new_truck
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[TruckResponse])
def get_trucks(
    repo: TruckRepository = Depends(get_truck_repo),
    auth_info: dict = Depends(get_clerk_auth)
):
    """
    Returnează toate camioanele.
    """
    return repo.get_all()

@router.patch("/{truck_id}", response_model=TruckResponse)
def update_truck(
    truck_id: int,
    truck_in: TruckUpdate,  # Folosim modelul de update pentru a permite actualizarea parțială
    repo: TruckRepository = Depends(get_truck_repo),
    auth_info: dict = Depends(get_clerk_auth)
):
    """
    Actualizează informațiile unui camion existent.
    """
    updated_truck = repo.update(truck_id, truck_in)
    if not updated_truck:
        raise HTTPException(status_code=404, detail="Truck not found")
    return updated_truck

@router.delete("/{truck_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_truck(
    truck_id: int,
    repo: TruckRepository = Depends(get_truck_repo),
    auth_info: dict = Depends(get_clerk_auth)
):
    """
    Sterge un camion din sistem.
    """
    success = repo.delete(truck_id)
    if not success:
        raise HTTPException(status_code=404, detail="Truck not found")
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)