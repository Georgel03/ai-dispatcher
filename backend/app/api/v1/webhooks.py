from fastapi import APIRouter, Request, HTTPException, Header, Depends
from svix.webhooks import Webhook, WebhookVerificationError
from app.core.config import settings
from app.services.auth_services import AuthService
from app.api.dependencies import get_auth_service
from app.domain.schemas import RoleEnum, UserCreate

router = APIRouter()

@router.post("/clerk")
async def clerk_webhook(
    request: Request,
    svix_id: str = Header(..., alias="svix-id"),
    svix_timestamp: str = Header(..., alias="svix-timestamp"),
    svix_signature: str = Header(..., alias="svix-signature"),
    service: AuthService = Depends(get_auth_service) 
):
    
    wh = Webhook(settings.CLERK_WEBHOOK_SECRET)
    payload = await request.body()
    try:
        
        msg = wh.verify(payload.decode("utf-8"), {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        })
    except WebhookVerificationError as e:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    event_type = msg.get("type")
    data = msg.get("data")

    if event_type == "user.created":
        emails = data.get("email_addresses", [])
        primary_email = emails[0].get("email_address") if emails else f"no-email-{data.get('id')}@example.com"

        user_dto = UserCreate(
            clerk_id=data.get("id"),
            email=primary_email,
            username=data.get("username") or data.get("id"),
            profile_picture_url=data.get("image_url"),
            role=RoleEnum.PENDING
        )
        
        try:
            service.sync_user_from_clerk(user_dto)
            print(f"Basic sync for user {user_dto.email}")
        except Exception as e:
            print(f"Warning during sync: {e}")

    return {"status": "ok"}