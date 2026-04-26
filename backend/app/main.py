from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import webhooks, users
from app.infrastructure.database import Base, engine
from app.infrastructure import models
from app.api.v1 import users, trucks, trailers, drivers, orders, dispatcher, admin

# Create DB Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title = "AI Dispatcher API", version = "1.0.0")

# Configurare CORS (Ca să meargă frontend-ul)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 6. Register Routers 
app.include_router(webhooks.router, prefix="/api/webhooks", tags=["Webhooks"])
app.include_router(users.router, prefix="/api/users", tags=["Users"]) 
app.include_router(trucks.router, prefix="/api/trucks", tags=["Trucks"])
app.include_router(trailers.router, prefix="/api/trailers", tags=["Trailers"])
app.include_router(drivers.router, prefix="/api/drivers", tags=["Drivers"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(dispatcher.router, prefix="/api/dispatcher", tags=["Dispatcher"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])

@app.get("/")
async def read_root():
    return {"status": "active", "message": "Welcome to the AI Dispatcher API!"}

@app.get("/optimize-test")
async def optimize_test():
    from ortools.constraint_solver import pywrapcp
    return {"status": "active", "message": "Google OR-Tools optimization test endpoint is working!"}


