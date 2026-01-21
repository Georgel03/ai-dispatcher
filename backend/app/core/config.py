from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: str
    CLERK_SECRET_KEY: str
    CLERK_WEBHOOK_SECRET: str
    CLERK_PEM_PUBLIC_KEY: str
    FRONTEND_URL: str = "http://localhost:3000"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()