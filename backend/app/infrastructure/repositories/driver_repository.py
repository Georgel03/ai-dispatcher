from sqlalchemy.orm import Session
from app.infrastructure.models import Driver, DriverStatus, User, Truck, DriverHOS
from app.domain.schemas import UserCreate, DriverCreate, DriverUpdate

class DriverRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all_drivers(self):
        
        results = (
            self.db.query(Driver, User.email, Truck.plate_number)
            .join(User, Driver.user_id == User.id)
            .outerjoin(Truck, Driver.id == Truck.driver_id)
            .all()
        )

        formatted_drivers = []
        for driver_obj, user_email, truck_plate in results:
            formatted_drivers.append({
                "id": driver_obj.id,
                "name": driver_obj.name,
                "phone": driver_obj.phone,
                "email": user_email,
                "status": driver_obj.status.value if driver_obj.status else "active",
                "assigned_truck": truck_plate
            })

        return formatted_drivers

    def get_by_id(self, driver_id: int):
        return self.db.query(Driver).filter(Driver.id == driver_id).first()

    def get_by_user_id(self, user_id: int):
        return self.db.query(Driver).filter(Driver.user_id == user_id).first()

    def create(self, driver: DriverCreate) -> Driver:
        new_driver = Driver(
            user_id=driver.user_id,
            name=driver.name,
            phone=driver.phone
        )
        self.db.add(new_driver)
        self.db.commit()
        self.db.refresh(new_driver)
        return new_driver
    
    def update_driver(self, driver_id: int, driver_update: DriverUpdate):
        driver = self.get_by_id(driver_id)
        if not driver:
            return None
        
        # Extragem doar datele trimise (ignorăm ce e None/nesetat)
        update_data = driver_update.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(driver, key, value)

        self.db.commit()
        self.db.refresh(driver)
        return driver

    def delete(self, driver_id: int):
        driver = self.get_by_id(driver_id)
        if not driver:
            return None

        user = self.db.query(User).filter(User.id == driver.user_id).first()
        clerk_id_to_delete = user.clerk_id if user else None

        self.db.query(Truck).filter(Truck.driver_id == driver_id).update({Truck.driver_id: None})

        self.db.query(DriverHOS).filter(DriverHOS.driver_id == driver_id).delete()

        self.db.delete(driver)

        if user:
            self.db.delete(user)

        self.db.commit()

        return clerk_id_to_delete
    
    def upsert_driver(self, user_id: int, name: str, phone: str):
        driver = self.db.query(Driver).filter(Driver.user_id == user_id).first()
        if driver:
            driver.name = name
            driver.phone = phone
        else:
            driver = Driver(
                user_id=user_id,
                name=name,
                phone=phone,
                status=DriverStatus.OFF_DUTY
            )
            self.db.add(driver)
            
        self.db.commit()
        if driver:
            self.db.refresh(driver)

        return driver

    