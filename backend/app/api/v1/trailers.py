from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from typing import List

from app.infrastructure.database import get_db
from app.domain.schemas import TrailerCreate, TrailerResponse, TrailerUpdate
from app.infrastructure.repositories.trailer_repository import TrailerRepository
from app.api.dependencies import get_clerk_auth

router = APIRouter()

def get_trailer_repo(db: Session = Depends(get_db)):
    return TrailerRepository(db)

@router.post("/", response_model=TrailerResponse)
def create_trailer(
    trailer_in: TrailerCreate,
    repo: TrailerRepository = Depends(get_trailer_repo),
    auth_info: dict = Depends(get_clerk_auth)
):
    try:
        return repo.create(trailer_in)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[TrailerResponse])
def get_trailers(
    repo: TrailerRepository = Depends(get_trailer_repo),
    auth_info: dict = Depends(get_clerk_auth)
):
    return repo.get_all()

@router.patch("/{trailer_id}", response_model=TrailerResponse)
def update_trailer(
    trailer_id: int,
    trailer_in: TrailerUpdate,
    repo: TrailerRepository = Depends(get_trailer_repo),
    auth_info: dict = Depends(get_clerk_auth)
):
    updated = repo.update(trailer_id, trailer_in)
    if not updated:
        raise HTTPException(status_code=404, detail="Trailer not found")
    return updated

@router.delete("/{trailer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_trailer(
    trailer_id: int,
    repo: TrailerRepository = Depends(get_trailer_repo),
    auth_info: dict = Depends(get_clerk_auth)
):
    if not repo.delete(trailer_id):
        raise HTTPException(status_code=404, detail="Trailer not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)