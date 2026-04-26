from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from typing import List

from app.infrastructure.database import get_db
from app.domain.schemas import OrderResponse, OrderCreate, OrderUpdate
from app.infrastructure.repositories.order_repository import OrderRepository
from app.services.order_service import OrderService
from app.api.dependencies import require_dispatcher_role
from pydantic import BaseModel

class AssignOrderRequest(BaseModel):
    truck_id: int

router = APIRouter()

def get_order_service(db: Session = Depends(get_db)):
    return OrderService(OrderRepository(db))

@router.get("/", response_model=List[OrderResponse])
def get_orders(service: OrderService = Depends(get_order_service), current_user = Depends(require_dispatcher_role)):
    return service.get_all_orders()

@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(order_in: OrderCreate, service: OrderService = Depends(get_order_service), current_user = Depends(require_dispatcher_role)):
    return service.create_order(order_in)

@router.patch("/{order_id}", response_model=OrderResponse)
def update_order(order_id: int, order_in: OrderUpdate, service: OrderService = Depends(get_order_service), current_user = Depends(require_dispatcher_role)):
    updated = service.update_order(order_id, order_in)
    if not updated:
        raise HTTPException(status_code=404, detail="Comanda nu a fost găsită.")
    return updated

@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(order_id: int, service: OrderService = Depends(get_order_service), current_user = Depends(require_dispatcher_role)):
    if not service.delete_order(order_id):
        raise HTTPException(status_code=404, detail="Comanda nu a fost găsită.")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.post("/{order_id}/assign", response_model=OrderResponse)
def assign_order(
    order_id: int, 
    assign_request: AssignOrderRequest, 
    service: OrderService = Depends(get_order_service), 
    current_user = Depends(require_dispatcher_role)
):
    result = service.assign_order_to_truck(order_id, assign_request.truck_id)
    if not result["success"]:
        raise HTTPException(status_code=result.get("code", 400), detail=result.get("error", "Eroare la asignarea comenzii."))
    return result["order"]


