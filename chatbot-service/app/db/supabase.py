from supabase import Client, create_client
from app.core.config import get_settings


def get_supabase_client(access_token: str | None = None) -> Client:
    settings = get_settings()
    client = create_client(
        settings.supabase_url,
        settings.supabase_anon_key,
    )
    if access_token:
        client.postgrest.auth(access_token)
    return client


def get_supabase_admin_client() -> Client:
    settings = get_settings()
    key = settings.supabase_service_role_key or settings.supabase_anon_key
    return create_client(
        settings.supabase_url,
        key,
    )
