import requests
from sqlalchemy import func
from app.infrastructure.repositories.order_repository import OrderRepository
from app.domain.schemas import OrderCreate, OrderUpdate
from app.infrastructure.models import Order, Truck, TruckStatus, OrderStatus
import json
from geoalchemy2.elements import WKTElement

class OrderService:
    def __init__(self, repository: OrderRepository):
        self.repository = repository
        self.db = repository.db

    def get_all_orders(self):
        return self.repository.get_all_orders()

    def create_order(self, order_data: OrderCreate):
        return self.repository.create(order_data)

    def update_order(self, order_id: int, order_data: OrderUpdate):
        return self.repository.update(order_id, order_data)

    def delete_order(self, order_id: int):
        return self.repository.delete(order_id)

    # --- NOUA METODĂ DE ALOCARE ȘI RUTARE OSRM (ROBUSTĂ) ---
    def assign_order_to_truck(self, order_id: int, truck_id: int):
        try:
            order = self.repository.get_by_id(order_id)
            if not order:
                return {"success": False, "error": "Comanda nu există.", "code": 404}
                
            truck = self.db.query(Truck).filter(Truck.id == truck_id).first()
            if not truck:
                return {"success": False, "error": "Camionul nu există.", "code": 404}

            # 1. Extragem coordonatele
            coords = self.db.query(
                func.ST_X(Order.pickup_location),
                func.ST_Y(Order.pickup_location),
                func.ST_X(Order.delivery_location),
                func.ST_Y(Order.delivery_location)
            ).filter(Order.id == order_id).first()

            truck_loc = None
            if truck.location:
                t_coords = self.db.query(
                    func.ST_X(Truck.location), 
                    func.ST_Y(Truck.location)
                ).filter(Truck.id == truck.id).first()
                if t_coords and None not in t_coords:
                    truck_loc = t_coords

            if not truck_loc:
                default_lng, default_lat = 21.9189, 47.0465 # Oradea
                truck.location = WKTElement(f'POINT({default_lng} {default_lat})', srid=4326)
                truck_loc = (default_lng, default_lat)
                self.db.commit()

            if not coords or None in coords:
                return {"success": False, "error": "Coordonatele comenzii sunt lipsă sau invalide.", "code": 400}

            # DEZAMBALĂM tuplul corect pentru a evita eroarea AttributeError!
            p_lng, p_lat, d_lng, d_lat = coords

           # --- OSRM 1: Ruta Principală ---
            main_route = []
            # AM ADĂUGAT &overview=full LA FINALUL URL-ULUI
            res_main = requests.get(f"http://router.project-osrm.org/route/v1/driving/{p_lng},{p_lat};{d_lng},{d_lat}?geometries=geojson&overview=full", timeout=10)
            if res_main.status_code == 200 and res_main.json().get('code') == 'Ok':
                main_route = res_main.json()['routes'][0]['geometry']['coordinates']

            # --- OSRM 2: Ruta de Abordare (Locație Camion -> Pickup) ---
            approach_route = []
            if truck_loc:
                t_lng, t_lat = truck_loc
                # AM ADĂUGAT &overview=full LA FINALUL URL-ULUI
                res_app = requests.get(f"http://router.project-osrm.org/route/v1/driving/{t_lng},{t_lat};{p_lng},{p_lat}?geometries=geojson&overview=full", timeout=10)
                if res_app.status_code == 200 and res_app.json().get('code') == 'Ok':
                    approach_route = res_app.json()['routes'][0]['geometry']['coordinates']

            # Salvăm ambele rute sub forma unui dicționar JSON complex
            complex_routing = {
                "approach": approach_route,  # Cum ajunge la marfă
                "main": main_route           # Cum duce marfa
            }
            
            # Salvăm direct obiectul (SQLAlchemy se ocupă de conversia în JSON pentru PostgreSQL)
            order.route_geometry = complex_routing
            order.current_waypoint_index = 0

            # 3. Actualizăm stările
            order.truck_id = truck.id
            order.status = OrderStatus.ASSIGNED
            truck.status = TruckStatus.IN_TRANSIT
            
            self.db.commit()
            self.db.refresh(order)

            # 4. Construim răspunsul actualizat
            updated_order_results = self.db.query(
                Order,
                func.ST_Y(Order.pickup_location).label('p_lat'),
                func.ST_X(Order.pickup_location).label('p_lng'),
                func.ST_Y(Order.delivery_location).label('d_lat'),
                func.ST_X(Order.delivery_location).label('d_lng')
            ).filter(Order.id == order_id).first()

            o, p_lat, p_lng, d_lat, d_lng = updated_order_results

            return {
                "success": True, 
                "order": {
                    **o.__dict__,
                    "pickup_lat": p_lat, "pickup_lng": p_lng,
                    "delivery_lat": d_lat, "delivery_lng": d_lng,
                    "status": o.status.value if o.status else "pending"
                }
            }
            
        except Exception as e:
            self.db.rollback()
            return {"success": False, "error": f"Eroare internă server: {str(e)}", "code": 500}