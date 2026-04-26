from sqlalchemy.orm import Session
from app.infrastructure.models import Driver, User, Truck, DriverHOS
from app.domain.schemas import UserCreate, DriverCreate, DriverUpdate
import os
import requests
from app.infrastructure.repositories.driver_repository import DriverRepository


class DriverService:
    def __init__(self, repository: DriverRepository):
        self.repository = repository

    def get_all_drivers(self):
        return self.repository.get_all_drivers()

    def get_driver_by_id(self, driver_id: int):
        return self.repository.get_by_id(driver_id)

    def get_driver_by_user_id(self, user_id: int):
        return self.repository.get_by_user_id(user_id)

    def update_driver(self, driver_id: int, driver_update: DriverUpdate):
        return self.repository.update_driver(driver_id, driver_update)
    

    def delete_driver(self, driver_id: int) -> bool:
        
        # 1. Apelăm Repository (care ar trebui să returneze False dacă șoferul nu există, 
        # sau clerk_id-ul dacă a fost șters cu succes)
        result = self.repository.delete(driver_id)
        
        if result is None: 
            # Șoferul nu a fost găsit, oprim execuția și returnăm False
            return False 
            
        clerk_id = result # Acum știm sigur că a fost șters, iar result este ID-ul din Clerk

        # 2. Ștergem din Clerk API folosind ID-ul salvat
        clerk_secret = os.getenv("CLERK_SECRET_KEY")
        if clerk_secret and clerk_id:
            clerk_url = f"https://api.clerk.com/v1/users/{clerk_id}"
            headers = {"Authorization": f"Bearer {clerk_secret}"}
            
            try:
                response = requests.delete(clerk_url, headers=headers)
                if response.status_code not in [200, 404]:
                    print(f"[Warning] Eroare Clerk API la ștergerea userului {clerk_id}: {response.text}")
            except Exception as e:
                print(f"[Error] Eroare de rețea la contactarea Clerk API: {str(e)}")

        return True