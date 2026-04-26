from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.infrastructure.database import get_db
from app.domain.schemas import FleetAssembleRequest, FleetUpdateRequest
from app.api.dependencies import require_dispatcher_role, get_current_user
from app.infrastructure.repositories.dispatcher_repository import DispatcherRepository
from app.services.dispatcher_service import DispatcherService


router = APIRouter()

# Dependency Injection pentru Service
def get_dispatcher_service(db: Session = Depends(get_db)):
    repository = DispatcherRepository(db)
    return DispatcherService(repository)

@router.get("/available-resources")
def get_available_resources(
    service: DispatcherService = Depends(get_dispatcher_service),
    current_user = Depends(require_dispatcher_role)
):
    try:
        resources = service.get_available_resources()
        return resources
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/assemble-fleet")
def assemble_fleet(
    request: FleetAssembleRequest,
    service: DispatcherService = Depends(get_dispatcher_service),
    current_user = Depends(require_dispatcher_role)
):

    try:
        result = service.assemble_fleet(request.driver_id, request.truck_id, request.trailer_id)
        if not result.get("success", True):
            raise HTTPException(status_code=result.get("code", 400), detail=result.get("error", "Unknown error"))
        return {"success": True, "message": "Fleet assembled successfully"}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/update-fleet")
def update_fleet(
    request: FleetUpdateRequest,
    service: DispatcherService = Depends(get_dispatcher_service),
    current_user = Depends(require_dispatcher_role)
):
    try:
        result = service.update_fleet(
            driver_id=request.driver_id,
            new_truck_id=request.truck_id,
            new_trailer_id=request.trailer_id
        )
        if not result.get("success", True):
            raise HTTPException(status_code=result.get("code", 400), detail=result.get("error", "Unknown error"))
        return {"success": True, "message": "Fleet updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/active-fleets")
def get_active_fleets(
    service: DispatcherService = Depends(get_dispatcher_service),
    current_user = Depends(require_dispatcher_role)
):
    try:
        return service.get_active_fleets()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/disassemble-fleet/{driver_id}")
def disassemble_fleet(
    driver_id: int,
    service: DispatcherService = Depends(get_dispatcher_service),
    current_user = Depends(require_dispatcher_role)
):
    try:
        result = service.disassemble_fleet(driver_id)
        if not result.get("success", True):
            raise HTTPException(status_code=result.get("code", 400), detail=result.get("error", "Unknown error"))
        return {"success": True, "message": "Fleet disassembled successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/live-map")
def get_live_map(
    service: DispatcherService = Depends(get_dispatcher_service),
    current_user = Depends(require_dispatcher_role)
):
    try:
        return service.get_live_map_data()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/simulate-tick")
def simulate_fleet_movement(
    speed: int = 5,
    service: DispatcherService = Depends(get_dispatcher_service),
    current_user = Depends(require_dispatcher_role)
):

    result = service.simulate_tick(speed_multiplier=speed)
    return result