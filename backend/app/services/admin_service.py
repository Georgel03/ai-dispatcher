from app.infrastructure.repositories.admin_repository import AdminRepository


class AdminService:
    def __init__(self, admin_repository: AdminRepository):
        self.admin_repository = admin_repository

    def get_dashboard_data(self):
        results = self.admin_repository.get_dashboard_trucks()
        dashboard_data = []
        
        for truck, driver, trailer in results:
            status_val = "N/A"
            if truck.status:
                status_val = truck.status.value if hasattr(truck.status, 'value') else str(truck.status)

            # Am scos telemetria complet. Păstrăm doar datele reale.
            dashboard_data.append({
                "id": truck.id,
                "name": truck.model,
                "plate": truck.plate_number,
                "status": status_val,
                "driver": {"id": driver.id, "name": driver.name} if driver else None,
                "trailer": {"id": trailer.id, "plate": trailer.plate_number, "capacity": f"{trailer.capacity_kg}kg"} if trailer else None
            })
            
        return dashboard_data

    
    def get_live_map_data(self):
        

        # Folosim outerjoin peste tot pentru a aduce TOATE camioanele (cu sau fără șofer/remorcă)
        results = self.dispatcher_repository.db.query(Truck, Driver, Trailer)\
            .outerjoin(Driver, Truck.driver_id == Driver.id)\
            .outerjoin(Trailer, Truck.trailer_id == Trailer.id)\
            .all()
            
        map_data = []
        for truck, driver, trailer in results:
            
            # 1. Extragem coordonatele GPS (dacă există)
            current_location = None
            if truck.location:
                point = self.dispatcher_repository.db.query(
                    func.ST_Y(truck.location).label('lat'), 
                    func.ST_X(truck.location).label('lng')
                ).first()
                if point and point.lat and point.lng:
                    current_location = [point.lat, point.lng]
            
            # Fallback (Mock) pentru camioanele care nu au încă GPS instalat (le punem pe lângă Oradea)
            if not current_location:
                 lat = 47.0465 + random.uniform(-0.08, 0.08)
                 lng = 21.9189 + random.uniform(-0.08, 0.08)
                 current_location = [lat, lng]

            # 2. Verificăm dacă acest camion are o comandă activă (Assigned sau In Transit)
            active_order = self.dispatcher_repository.db.query(Order).filter(
                Order.truck_id == truck.id,
                Order.status.in_(["assigned", "in_transit"])
            ).first()

            order_data = None
            if active_order:
                order_data = {
                    "id": active_order.id,
                    "description": active_order.description,
                    "status": active_order.status.value if hasattr(active_order.status, 'value') else str(active_order.status)
                }

            # 3. Construim pachetul de date
            map_data.append({
                "fleet_id": f"fleet_{truck.id}",
                "driver": {
                    "id": driver.id,
                    "name": driver.name,
                    "phone": driver.phone,
                } if driver else None,
                "truck": {
                    "id": truck.id,
                    "plate": truck.plate_number,
                    "model": truck.model,
                    "status": truck.status.value if hasattr(truck.status, 'value') else str(truck.status)
                },
                "trailer": {
                    "plate": trailer.plate_number,
                } if trailer else None,
                "current_location": current_location,
                "active_order": order_data # Trimitem comanda către Frontend
            })
            
        return map_data