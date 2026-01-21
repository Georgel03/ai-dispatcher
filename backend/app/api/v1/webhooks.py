from fastapi import APIRouter, Request, HTTPException, Header, Depends
from svix.webhooks import Webhook, WebhookVerificationError
from app.core.config import settings
from app.services.auth_services import AuthService
from app.api.dependencies import get_auth_service
from app.domain.schemas import UserCreate

router = APIRouter()

@router.post("/clerk")
async def clerk_webhook(
    request: Request,
    svix_id: str = Header(..., alias="svix-id"),
    svix_timestamp: str = Header(..., alias="svix-timestamp"),
    svix_signature: str = Header(..., alias="svix-signature"),
    service: AuthService = Depends(get_auth_service) # <--- Injected Service!
):
    # 1. Verification (Infra logic)
    wh = Webhook(settings.CLERK_WEBHOOK_SECRET)
    payload = await request.body()
    try:
        msg = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        })
    except WebhookVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    # 2. Extract Data
    event_type = msg.get("type")
    data = msg.get("data")

    if event_type == "user.created":
        user_dto = UserCreate(
            clerk_id=data.get("id"),
            email=data["email_addresses"][0]["email_address"],
            username=data.get("username"),
            profile_picture_url=data.get("image_url"),
            role="driver"
        )
        
        # 3. Call Service (Business Logic)
        service.sync_user_from_clerk(user_dto)
        print(f"✅ Synced user {user_dto.email}")

    return {"status": "ok"}