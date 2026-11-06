from fastapi import APIRouter, Depends, Header, HTTPException, status
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import chat_service
from app.db.supabase import get_supabase_client, get_supabase_admin_client

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


async def get_current_user_optional(authorization: str | None = Header(None)):
    """
    Extracts and validates Supabase JWT token if provided.
    Permits guest/demo mode while securing student context when authenticated.
    """
    if not authorization:
        return None

    token = authorization.replace("Bearer ", "").strip()
    if not token:
        return None

    try:
        client = get_supabase_client()
        user_response = client.auth.get_user(token)
        if user_response and user_response.user:
            return user_response.user
    except Exception as e:
        # Invalid token
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired authentication token: {str(e)}",
        )

    return None


@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    current_user=Depends(get_current_user_optional),
):
    # 1. Generate pedagogical Socratic response via Groq
    response_text = chat_service.generate_response(request.message)

    # 2. If conversation_id is provided and user is authenticated, persist to public.messages
    if request.conversation_id and current_user:
        try:
            admin_client = get_supabase_admin_client()
            admin_client.table("messages").insert({
                "conversation_id": request.conversation_id,
                "role": "assistant",
                "content": response_text,
            }).execute()
        except Exception as e:
            # Non-blocking log if DB insertion encounters issues
            print(f"Failed to record message history in Supabase: {e}")

    return ChatResponse(
        message=response_text,
        cards=[],
        key_insight=None,
    )
