from database import SessionLocal, engine
import models
from models import DriverStatus, TrailerType, OrderStatus
import datetime

# Ne asigurăm că tabelele există
models.Base.metadata.create_all(bind=engine)

db = SessionLocal()

def seed_database():
    print("🌱 Începem popularea bazei de date...")

    # 1. Curățăm datele vechi (opțional, pentru teste repetate)
    db.query(models.Order).delete()
    db.query(models.Driver).delete()
    db.query(models.Semitrailer).delete()
    db.query(models.Truck).delete()
    db.query(models.User).delete()
    db.commit()

    # 2. Creăm un ADMIN
    admin = models.User(
        username="admin@admin.com",
        hashed_password="hashed_secret_password", # În realitate folosim hash
        role="admin",
        profile_picture_url="https://i.pravatar.cc/150?u=admin"
    )
    db.add(admin)
    db.commit()
    print("✅ Admin creat.")

    # 3. Creăm un CAMION
    truck = models.Truck(
        plate_number="B 99 TIR",
        model="Volvo FH16",
        own_weight_kg=8000
    )
    db.add(truck)
    db.commit() # Dăm commit ca să primească ID
    print(f"✅ Camion creat: {truck.plate_number}")

    # 4. Creăm o SEMIREMORCĂ (și o atașăm la camion)
    trailer = models.Semitrailer(
        plate_number="B 55 RMC",
        type=TrailerType.FRIGO,
        capacity_kg=22000,
        own_weight_kg=7500,
        truck_id=truck.id  # <--- O CUPLĂM LA CAMION
    )
    db.add(trailer)
    print(f"✅ Remorcă creată și cuplată: {trailer.plate_number}")

    # 5. Creăm un ȘOFER (și îl urcăm în camion)
    driver = models.Driver(
        name="Gigel Soferul",
        phone="0722123456",
        status=DriverStatus.ACTIVE,
        location="POINT(26.1025 44.4268)", # București (lat, long)
        truck_id=truck.id # <--- ÎL ALOCĂM PE CAMION
    )
    db.add(driver)
    db.commit()
    print(f"✅ Șofer creat și alocat: {driver.name}")

    # 6. Creăm o COMANDĂ (Disponibilă pentru Frigorific)
    order = models.Order(
        description="Transport Carne Congelată",
        weight_kg=15000,
        required_trailer_type=TrailerType.FRIGO,
        
        # Coordonate: Arad -> Constanța
        pickup_location="POINT(21.3167 46.1833)", 
        delivery_location="POINT(28.6348 44.1792)",
        
        pickup_deadline=datetime.datetime.now() + datetime.timedelta(days=1),
        delivery_deadline=datetime.datetime.now() + datetime.timedelta(days=2),
        
        status=OrderStatus.PENDING
    )
    db.add(order)
    db.commit()
    print("✅ Comandă creată: Arad -> Constanța")

    print("🚀 Baza de date a fost populată cu succes!")

if __name__ == "__main__":
    seed_database()
    db.close()