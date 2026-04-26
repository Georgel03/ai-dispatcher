from sqlalchemy.orm import Session
from app.infrastructure.models import Truck
from app.domain.schemas import TruckCreate, TruckUpdate

class TruckRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Truck).all()

    def get_by_id(self, truck_id: int):
        return self.db.query(Truck).filter(Truck.id == truck_id).first()

    def create(self, truck_data: TruckCreate) -> Truck:

        geom_location = None
        if truck_data.location:
            # PostGIS foloseste formatul 'SRID=4326;POINT(longitudine latitudine)' - ATENTIE la ordine: lng inainte de lat
            geom_location = f"SRID=4326;POINT({truck_data.location.longitude} {truck_data.location.latitude})"
    
        new_truck = Truck(
            plate_number=truck_data.plate_number,
            model=truck_data.model,
            own_weight_kg=truck_data.own_weight_kg,
            location=geom_location,
            driver_id=truck_data.driver_id,
            trailer_id=truck_data.trailer_id
        )

        self.db.add(new_truck)
        self.db.commit()
        self.db.refresh(new_truck)
        return new_truck

    def update(self, truck_id: int,  truck_data: TruckUpdate) -> Truck:
        truck = self.get_by_id(truck_id)
        if not truck:
            return None

        truck.plate_number = truck_data.plate_number
        truck.model = truck_data.model
        truck.own_weight_kg = truck_data.own_weight_kg

        if truck_data.location:
            truck.location = f"SRID=4326;POINT({truck_data.location.longitude} {truck_data.location.latitude})"
        
        truck.driver_id = truck_data.driver_id
        truck.trailer_id = truck_data.trailer_id

        self.db.commit()
        self.db.refresh(truck)
        return truck

    def delete(self, truck_id: int) -> bool:
        truck = self.get_by_id(truck_id)
        if not truck:
            return False
            
        self.db.delete(truck)
        self.db.commit()
        return True

    def get_available_trucks(self):
        available_trucks = db.query(Truck).filter(
            Truck.driver_id == None, 
            Truck.trailer_id == None
        ).all()
        return available_trucks
        