from sqlalchemy.orm import Session
from app.infrastructure.models import Trailer
from app.domain.schemas import TrailerCreate, TrailerUpdate

class TrailerRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Trailer).all()

    def get_by_id(self, trailer_id: int):
        return self.db.query(Trailer).filter(Trailer.id == trailer_id).first()

    def create(self, trailer_data: TrailerCreate) -> Trailer:

        geom_location = None
        if trailer_data.parked_location:
            # PostGIS foloseste formatul 'SRID=4326;POINT(longitudine latitudine)' - ATENTIE la ordine: lng inainte de lat
            geom_location = f"SRID=4326;POINT({trailer_data.parked_location.longitude} {trailer_data.parked_location.latitude})"
    
        new_trailer = Trailer(
            plate_number=trailer_data.plate_number,
            type=trailer_data.type,
            capacity_kg=trailer_data.capacity_kg,
            own_weight_kg=trailer_data.own_weight_kg,
            parked_location=geom_location

        )

        self.db.add(new_trailer)
        self.db.commit()
        self.db.refresh(new_trailer)
        return new_trailer

    def update(self, trailer_id: int,  trailer_data: TrailerUpdate) -> Trailer:
        trailer = self.get_by_id(trailer_id)
        if not trailer:
            return None

        update_data = trailer_data.model_dump(exclude_unset=True)

        if "parked_location" in update_data:
            loc = update_data.pop("parked_location")
            if loc:
                update_data["parked_location"] = f"SRID=4326;POINT({loc['longitude']} {loc['latitude']})"
            else:
                update_data["parked_location"] = None
                
        for key, value in update_data.items():
            setattr(trailer, key, value)

        self.db.commit()
        self.db.refresh(trailer)
        return trailer

    def delete(self, trailer_id: int) -> bool:
        trailer = self.get_by_id(trailer_id)
        if not trailer:
            return False
            
        self.db.delete(trailer)
        self.db.commit()
        return True

   