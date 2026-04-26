from sqlalchemy.orm import Session
from app.infrastructure.models import Order, Truck, TruckStatus, OrderStatus
from app.domain.schemas import OrderCreate, OrderUpdate
from geoalchemy2.elements import WKTElement
from sqlalchemy import func

class OrderRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all_orders(self):
        # Extragem obiectul Order + Coordonatele sale separate
        results = self.db.query(
            Order,
            func.ST_Y(Order.pickup_location).label('p_lat'),
            func.ST_X(Order.pickup_location).label('p_lng'),
            func.ST_Y(Order.delivery_location).label('d_lat'),
            func.ST_X(Order.delivery_location).label('d_lng')
        ).order_by(Order.created_at.desc()).all()

        formatted_orders = []
        for order, p_lat, p_lng, d_lat, d_lng in results:
            formatted_orders.append({
                "id": order.id,
                "description": order.description,
                "weight_kg": order.weight_kg,
                "required_trailer_type": order.required_trailer_type,
                "status": order.status.value if order.status else "pending",
                "created_at": order.created_at,
                "pickup_deadline": order.pickup_deadline,
                "delivery_deadline": order.delivery_deadline,
                "truck_id": order.truck_id,
                "pickup_lat": p_lat,
                "pickup_lng": p_lng,
                "delivery_lat": d_lat,
                "delivery_lng": d_lng
            })
        return formatted_orders

    def get_by_id(self, order_id: int):
        return self.db.query(Order).filter(Order.id == order_id).first()

    def create(self, order_in: OrderCreate) -> Order:
        # Convertim Lat/Lng în format spațial (Point)
        pickup_geom = WKTElement(f'POINT({order_in.pickup_lng} {order_in.pickup_lat})', srid=4326)
        delivery_geom = WKTElement(f'POINT({order_in.delivery_lng} {order_in.delivery_lat})', srid=4326)

        new_order = Order(
            description=order_in.description,
            weight_kg=order_in.weight_kg,
            required_trailer_type=order_in.required_trailer_type,
            pickup_location=pickup_geom,
            delivery_location=delivery_geom,
            pickup_deadline=order_in.pickup_deadline,
            delivery_deadline=order_in.delivery_deadline,
            status=order_in.status
        )
        self.db.add(new_order)
        self.db.commit()
        self.db.refresh(new_order)

        return {
            **new_order.__dict__,
            "pickup_lat": order_in.pickup_lat,
            "pickup_lng": order_in.pickup_lng,
            "delivery_lat": order_in.delivery_lat,
            "delivery_lng": order_in.delivery_lng,
            "status": new_order.status.value if new_order.status else "pending"
        }

    def update(self, order_id: int, order_in: OrderUpdate):
        order = self.get_by_id(order_id)
        if not order:
            return None
            
        # Extragem doar datele trimise în request
        update_data = order_in.model_dump(exclude_unset=True)
        
        # 1. Transformăm coordonatele de PICKUP dacă au fost trimise
        if "pickup_lat" in update_data and "pickup_lng" in update_data:
            pickup_geom = WKTElement(f'POINT({update_data["pickup_lng"]} {update_data["pickup_lat"]})', srid=4326)
            update_data["pickup_location"] = pickup_geom
            # Ștergem cheile temporare pentru că ele nu există în modelul SQLAlchemy
            del update_data["pickup_lat"]
            del update_data["pickup_lng"]

        # 2. Transformăm coordonatele de DELIVERY dacă au fost trimise
        if "delivery_lat" in update_data and "delivery_lng" in update_data:
            delivery_geom = WKTElement(f'POINT({update_data["delivery_lng"]} {update_data["delivery_lat"]})', srid=4326)
            update_data["delivery_location"] = delivery_geom
            del update_data["delivery_lat"]
            del update_data["delivery_lng"]

        # 3. Timpul (deadlines) se actualizează automat în bucla de mai jos 
        #    pentru că numele lor se potrivește perfect cu modelul bazei de date.

        # 4. Aplicăm datele formatate pe obiectul nostru
        for key, value in update_data.items():
            setattr(order, key, value)
            
        self.db.commit()
        self.db.refresh(order)

        updated_order_results = self.db.query(
            Order,
            func.ST_Y(Order.pickup_location).label('p_lat'),
            func.ST_X(Order.pickup_location).label('p_lng'),
            func.ST_Y(Order.delivery_location).label('d_lat'),
            func.ST_X(Order.delivery_location).label('d_lng')
        ).filter(Order.id == order_id).first()

        o, p_lat, p_lng, d_lat, d_lng = updated_order_results
        return {
            **o.__dict__,
            "pickup_lat": p_lat, "pickup_lng": p_lng,
            "delivery_lat": d_lat, "delivery_lng": d_lng,
            "status": o.status.value if o.status else "pending"
        }


    def delete(self, order_id: int) -> bool:
        order = self.get_by_id(order_id)
        if not order:
            return False
            
        if order.truck_id:
            truck = self.db.query(Truck).filter(Truck.id == order.truck_id).first()
            if truck:
                truck.status = TruckStatus.AVAILABLE
                
        self.db.delete(order)
        self.db.commit()
        return True