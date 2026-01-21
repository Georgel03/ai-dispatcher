from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import webhooks, users
from app.infrastructure.database import Base, engine
from app.infrastructure import models

# Create DB Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title = "AI Dispatcher API", version = "1.0.0")

# Configurare CORS (Ca să meargă frontend-ul)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 6. Register Routers (Only once!)
app.include_router(webhooks.router, prefix="/api/webhooks", tags=["Webhooks"])
app.include_router(users.router, prefix="/api/users", tags=["Users"]) # <--- Add this line!

@app.get("/")
async def read_root():
    return {"status": "active", "message": "Welcome to the AI Dispatcher API!"}

@app.get("/optimize-test")
async def optimize_test():
    from ortools.constraint_solver import pywrapcp
    return {"status": "active", "message": "Google OR-Tools optimization test endpoint is working!"}


