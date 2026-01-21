# Folosim o imagine oficială Python
FROM python:3.10-slim

# Setăm directorul de lucru
WORKDIR /app

# Instalăm dependențele de sistem necesare pentru GeoAlchemy/PostGIS
RUN apt-get update && apt-get install -y libpq-dev gcc

# Copiem fișierul de dependențe și instalăm
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiem restul codului
COPY . .

# Note the change: "app.main:app" instead of "main:app"
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]