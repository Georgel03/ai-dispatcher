from app.infrastructure.repositories.dispatcher_repository import DispatcherRepository
from app.infrastructure.models import DriverStatus, TruckStatus, OrderStatus, Truck, Driver, Trailer, Order
from sqlalchemy import func
from geoalchemy2.elements import WKTElement
from sqlalchemy.orm.attributes import flag_modified
import random


class DispatcherService:

    def __init__(self, dispatcher_repository: DispatcherRepository):
        self.dispatcher_repository = dispatcher_repository

    def get_available_resources(self):
        available_drivers = self.dispatcher_repository.get_available_drivers()
        available_trucks = self.dispatcher_repository.get_available_trucks()
        available_trailers = self.dispatcher_repository.get_available_trailers()
        return {
            "drivers": [{"id": d.id, "name": d.name} for d in available_drivers], # Aici am corectat
            "trucks": [{"id": t.id, "plate_number": t.plate_number, "model": t.model, "own_weight_kg": t.own_weight_kg} for t in available_trucks], # Aici am corectat
            "trailers": [{"id": t.id, "plate_number": t.plate_number, "type": t.type.value if t.type else "prelata", "capacity_kg": t.capacity_kg} for t in available_trailers] # Aici am corectat
        }

    def assemble_fleet(self, driver_id: int, truck_id: int, trailer_id: int):
        driver = self.dispatcher_repository.get_driver_by_id(driver_id)
        truck = self.dispatcher_repository.get_truck_by_id(truck_id)
        trailer = self.dispatcher_repository.get_trailer_by_id(trailer_id)

        if not driver or not truck or not trailer:
            raise ValueError("Invalid driver, truck, or trailer ID")

        if truck.driver_id or truck.trailer_id:
            return {"success": False, "error": "Camionul este deja alocat!", "code": 400}

        truck.driver_id = driver.id
        truck.trailer_id = trailer.id

        driver.status = DriverStatus.ACTIVE
        truck.status = TruckStatus.AVAILABLE

        self.dispatcher_repository.save()
        return {"success": True}

    def update_fleet(self, driver_id: int, new_truck_id: int = None, new_trailer_id: int = None):
        driver = self.dispatcher_repository.get_driver_by_id(driver_id)
        if not driver:
            return {"success": False, "error": "Șoferul nu a fost găsit.", "code": 404}

        # Găsim camionul curent condus de acest șofer
        current_truck = self.dispatcher_repository.db.query(Truck).filter(Truck.driver_id == driver_id).first()

        # --- SCENARIUL 1: Vrem să schimbăm Capul Tractor ---
        if new_truck_id and (not current_truck or current_truck.id != new_truck_id):
            new_truck = self.dispatcher_repository.get_truck_by_id(new_truck_id)
            if not new_truck:
                return {"success": False, "error": "Noul cap tractor nu există.", "code": 404}
            if new_truck.driver_id:
                 return {"success": False, "error": "Noul camion este deja condus de altcineva.", "code": 400}
            
            # Eliberăm vechiul camion (dacă avea unul)
            if current_truck:
                current_truck.driver_id = None
                current_truck.trailer_id = None
                current_truck.status = TruckStatus.AVAILABLE
                
                # MAGIC LINE: Forțăm baza de date să elibereze șoferul ACUM, ca să nu primim UniqueViolation
                self.dispatcher_repository.db.flush()
            
            # Legăm noul camion de șofer
            new_truck.driver_id = driver.id
            new_truck.status = TruckStatus.AVAILABLE
            current_truck = new_truck # Salvăm referința pentru a-i lega remorca mai jos

        # --- SCENARIUL 2: Vrem să schimbăm/adăugăm/ștergem Remorca ---
        if current_truck:
            if new_trailer_id:
                 if current_truck.trailer_id != new_trailer_id:
                     new_trailer = self.dispatcher_repository.get_trailer_by_id(new_trailer_id)
                     if not new_trailer:
                          return {"success": False, "error": "Noua remorcă nu există.", "code": 404}
                     
                     existing_truck = self.dispatcher_repository.db.query(Truck).filter(Truck.trailer_id == new_trailer.id).first()
                     if existing_truck:
                         existing_truck.trailer_id = None
                         # MAGIC LINE: Forțăm eliberarea remorcii vechi din baza de date ACUM
                         self.dispatcher_repository.db.flush()
                     
                     current_truck.trailer_id = new_trailer.id
            else:
                 # Dacă noul trailer_id este Null, înseamnă că dispecerul a ales "Decuplează remorca"
                 current_truck.trailer_id = None

        self.dispatcher_repository.save()
        return {"success": True}

    def get_active_fleets(self):
        trucks = self.dispatcher_repository.get_active_fleets()
        fleets = []
        for t in trucks:
            fleets.append({
                "truck_id": t.id,
                "truck_plate": t.plate_number,
                "driver_id": t.driver.id if t.driver else None,
                "driver_name": t.driver.name if t.driver else "Necunoscut",
                "trailer_id": t.trailer.id if t.trailer else None,
                "trailer_plate": t.trailer.plate_number if t.trailer else "Fără remorcă",
                "status": t.status.value if t.status else "N/A"
            })

        return fleets

    def disassemble_fleet(self, driver_id: int):

        driver = self.dispatcher_repository.get_driver_by_id(driver_id)
        if not driver:
            return {"success": False, "error": "Șoferul nu a fost găsit.", "code": 404}

        current_truck = self.dispatcher_repository.get_truck_by_driver_id(driver_id)

        if current_truck:
            current_truck.driver_id = None
            current_truck.trailer_id = None
            current_truck.status = TruckStatus.AVAILABLE

        driver.status = DriverStatus.ACTIVE

        self.dispatcher_repository.save()
        return {"success": True}

    def get_live_map_data(self):
        # Folosim outerjoin pentru a aduce TOATE camioanele
        results = self.dispatcher_repository.db.query(Truck, Driver, Trailer)\
            .outerjoin(Driver, Truck.driver_id == Driver.id)\
            .outerjoin(Trailer, Truck.trailer_id == Trailer.id)\
            .all()
            
        map_data = []
        for truck, driver, trailer in results:
            
            # 1. CORECȚIE AICI: Interogăm tabelul TRUCK direct, nu obiectul din memorie, pentru a sparge Cache-ul!
            current_location = None
            if truck.location:
                t_coords = self.dispatcher_repository.db.query(
                    func.ST_X(Truck.location), func.ST_Y(Truck.location)
                ).filter(Truck.id == truck.id).first()
                
                if t_coords and None not in t_coords:
                    current_location = [t_coords[1], t_coords[0]] # [lat, lng]
            
            # Fallback (Mock) pentru camioanele fără GPS
            if not current_location:
                 lat = 47.0465 + random.uniform(-0.08, 0.08)
                 lng = 21.9189 + random.uniform(-0.08, 0.08)
                 current_location = [lat, lng]

            # 2. Căutăm comanda activă
            active_order = self.dispatcher_repository.db.query(Order).filter(
                Order.truck_id == truck.id,
                Order.status.in_(["assigned", "in_transit", OrderStatus.ASSIGNED, OrderStatus.IN_TRANSIT])
            ).first()

            order_data = None
            if active_order:
                order_coords = self.dispatcher_repository.db.query(
                    func.ST_Y(Order.pickup_location).label('p_lat'),
                    func.ST_X(Order.pickup_location).label('p_lng'),
                    func.ST_Y(Order.delivery_location).label('d_lat'),
                    func.ST_X(Order.delivery_location).label('d_lng')
                ).filter(Order.id == active_order.id).first()

                order_data = {
                    "id": active_order.id,
                    "description": active_order.description,
                    "status": active_order.status.value if hasattr(active_order.status, 'value') else str(active_order.status), 
                    "route_geometry" : active_order.route_geometry, 
                    "pickup_coords": [order_coords.p_lat, order_coords.p_lng] if order_coords else None,
                    "delivery_coords": [order_coords.d_lat, order_coords.d_lng] if order_coords else None,
                }

            # 3. Construim pachetul
            map_data.append({
                "fleet_id": f"fleet_{truck.id}",
                "driver": { "id": driver.id, "name": driver.name, "phone": driver.phone } if driver else None,
                "truck": { "id": truck.id, "plate": truck.plate_number, "model": truck.model, "status": truck.status.value if hasattr(truck.status, 'value') else str(truck.status) },
                "trailer": { "plate": trailer.plate_number } if trailer else None,
                "current_location": current_location,
                "active_order": order_data
            })
            
        return map_data


    def simulate_tick(self, speed_multiplier: int = 5):    
        try:
            active_orders = self.dispatcher_repository.db.query(Order).filter(
                Order.status.in_(["assigned", "in_transit", OrderStatus.ASSIGNED, OrderStatus.IN_TRANSIT])
            ).all()

            updated_trucks = 0 
            
            for order in active_orders:
                truck = self.dispatcher_repository.db.query(Truck).filter(Truck.id == order.truck_id).first()
                if not truck: continue

                if str(order.status).lower() == "assigned" or str(order.status).lower().endswith("assigned"):
                    order.status = OrderStatus.IN_TRANSIT

                geom = order.route_geometry
                if not geom or not isinstance(geom, dict): continue

                full_route = (geom.get("approach") or []) + (geom.get("main") or [])
                approach_len = len(geom.get("approach") or [])
                if not full_route: continue

                new_geom = dict(geom)

                # --- STATE MACHINE (Creierul Simulatorului) ---
                current_idx = new_geom.get("current_waypoint_index", 0)
                sim_state = new_geom.get("sim_state", "driving") # Poate fi: driving, loading, pausing, resting, completed
                sim_ticks = new_geom.get("sim_ticks", 0)
                sim_shifts = new_geom.get("sim_shifts", 0)

                is_completed = False

                if sim_state == "completed":
                    continue # Dacă a terminat cursa, îl ignorăm complet

                # Logica de trecere a timpului în funcție de stare
                if sim_state == "loading":
                    sim_ticks += speed_multiplier
                    if sim_ticks >= 150:  # A stat suficient să încarce marfa (aprox. 1h)
                        sim_state = "driving"
                        sim_ticks = 0

                elif sim_state == "pausing":
                    sim_ticks += speed_multiplier
                    if sim_ticks >= 100:  # A făcut pauza de 45 min
                        sim_state = "driving"
                        sim_ticks = 0

                elif sim_state == "resting":
                    sim_ticks += speed_multiplier
                    if sim_ticks >= 400:  # A făcut pauza de 10 ore (Somn)
                        sim_state = "driving"
                        sim_ticks = 0
                        sim_shifts = 0 # Resetăm programul de condus

                elif sim_state == "driving":
                    next_idx = current_idx + speed_multiplier

                    # A AJUNS LA PUNCTUL DE ÎNCĂRCARE? (P)
                    if current_idx < approach_len and next_idx >= approach_len:
                        current_idx = approach_len
                        sim_state = "loading" # Trecem camionul pe Încărcare!
                        sim_ticks = 0
                    else:
                        current_idx = next_idx
                        sim_ticks += speed_multiplier

                        # TAHOGRAF (Conduce max 1200 "kilometri/puncte" = 4.5 ore)
                        if sim_ticks >= 1200:
                            sim_shifts += 1
                            sim_ticks = 0
                            if sim_shifts >= 2:
                                sim_state = "resting" # A doua oară intră la somn
                            else:
                                sim_state = "pausing" # Prima oară ia pauză 45m

                # A AJUNS LA DESTINAȚIA FINALĂ? (D)
                if current_idx >= len(full_route) - 1:
                    current_idx = len(full_route) - 1
                    is_completed = True
                    sim_state = "completed"

                # Aplicăm coordonatele pe camion
                new_lng, new_lat = full_route[current_idx]
                new_point = WKTElement(f'POINT({new_lng} {new_lat})', srid=4326)

                # Salvăm Stările Noi în JSON
                new_geom["current_waypoint_index"] = current_idx
                new_geom["sim_state"] = sim_state
                new_geom["sim_ticks"] = sim_ticks
                new_geom["sim_shifts"] = sim_shifts

                if is_completed:
                    self.dispatcher_repository.db.query(Order).filter(Order.id == order.id).update({
                        "status": OrderStatus.COMPLETED,
                        "route_geometry": new_geom
                    }, synchronize_session=False)
                    self.dispatcher_repository.db.query(Truck).filter(Truck.id == order.truck_id).update({
                        "status": TruckStatus.AVAILABLE,
                        "location": new_point
                    }, synchronize_session=False)
                else:
                    self.dispatcher_repository.db.query(Order).filter(Order.id == order.id).update({
                        "status": OrderStatus.IN_TRANSIT,
                        "route_geometry": new_geom
                    }, synchronize_session=False)
                    self.dispatcher_repository.db.query(Truck).filter(Truck.id == order.truck_id).update({
                        "status": TruckStatus.IN_TRANSIT,
                        "location": new_point
                    }, synchronize_session=False)

                order.route_geometry = new_geom
                flag_modified(order, "route_geometry") 
                updated_trucks += 1 

            self.dispatcher_repository.db.commit()
            return {"success": True, "moved_trucks": updated_trucks}
            
        except Exception as e:
            self.dispatcher_repository.db.rollback()
            print(f"Eroare în simulate_tick: {str(e)}")
            return {"success": False, "error": str(e), "code": 500}


