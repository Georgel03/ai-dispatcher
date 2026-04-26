from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.infrastructure.database import get_db
from app.api.dependencies import require_admin_role 
from app.infrastructure.repositories.admin_repository import AdminRepository
from app.services.admin_service import AdminService

router = APIRouter()

# Dependency Injection pentru Admin Service
def get_admin_service(db: Session = Depends(get_db)):
    repository = AdminRepository(db)
    return AdminService(repository)

@router.get("/dashboard")
def get_dashboard(
    service: AdminService = Depends(get_admin_service),
    # PROTECȚIA AICI: Doar adminii pot apela acest endpoint!
    current_user = Depends(require_admin_role) 
):
    try:
        return service.get_dashboard_data()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))