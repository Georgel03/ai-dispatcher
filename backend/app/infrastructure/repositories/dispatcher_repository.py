from sqlalchemy.orm import Session
from app.infrastructure.models import Driver, Truck, Trailer

class DispatcherRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_available_drivers(self):
        assigned_driver_ids = [t.driver_id for t in self.db.query(Truck.driver_id).filter(Truck.driver_id != None).all()]
        available_drivers = self.db.query(Driver).filter(Driver.id.not_in(assigned_driver_ids)).all()
        return available_drivers

    def get_available_trucks(self):
        # AICI ERA EROAREA: Era "db.query", acum este "self.db.query"
        available_trucks = self.db.query(Truck).filter(
            Truck.driver_id == None, 
            Truck.trailer_id == None
        ).all()
        return available_trucks

    def get_available_trailers(self):
        assigned_trailer_ids = [t.trailer_id for t in self.db.query(Truck.trailer_id).filter(Truck.trailer_id != None).all()]
        available_trailers = self.db.query(Trailer).filter(Trailer.id.not_in(assigned_trailer_ids)).all()
        return available_trailers

    def get_truck_by_id(self, truck_id: int):
        return self.db.query(Truck).filter(Truck.id == truck_id).first()

    def get_driver_by_id(self, driver_id: int):
        return self.db.query(Driver).filter(Driver.id == driver_id).first()

    def get_trailer_by_id(self, trailer_id: int):
        return self.db.query(Trailer).filter(Trailer.id == trailer_id).first()

    def get_truck_by_driver_id(self, driver_id: int):
        return self.db.query(Truck).filter(Truck.driver_id == driver_id).first()

    def get_active_fleets(self):
        return self.db.query(Truck).filter(Truck.driver_id != None, Truck.trailer_id != None).all()

    def save(self):
        self.db.commit()