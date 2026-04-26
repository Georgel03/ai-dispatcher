from sqlalchemy.orm import Session
from app.infrastructure.models import Driver, Truck, Trailer

class AdminRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_dashboard_trucks(self):
        # Aducem TOATE camioanele pentru vizualizarea globală a adminului
        return self.db.query(Truck, Driver, Trailer)\
            .outerjoin(Driver, Truck.driver_id == Driver.id)\
            .outerjoin(Trailer, Truck.trailer_id == Trailer.id).all()