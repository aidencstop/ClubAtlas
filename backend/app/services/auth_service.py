"""
서버 사이드 인증 검증 서비스
"""
from typing import Optional
from firebase_admin import auth
from app.services.firebase_admin import get_auth


async def verify_id_token(token: str) -> Optional[dict]:
    """
    Firebase ID 토큰 검증
    
    Args:
        token: Firebase ID 토큰
        
    Returns:
        검증된 토큰의 디코딩된 정보 (uid, email 등) 또는 None
    """
    try:
        auth_client = get_auth()
        decoded_token = auth_client.verify_id_token(token)
        return decoded_token
    except Exception:
        return None


async def get_user_by_uid(uid: str) -> Optional[dict]:
    """
    UID로 사용자 정보 가져오기
    
    Args:
        uid: Firebase 사용자 UID
        
    Returns:
        사용자 정보 또는 None
    """
    try:
        auth_client = get_auth()
        user = auth_client.get_user(uid)
        return {
            "uid": user.uid,
            "email": user.email,
            "email_verified": user.email_verified,
            "display_name": user.display_name,
            "disabled": user.disabled,
        }
    except Exception:
        return None


async def set_custom_user_claims(uid: str, claims: dict) -> bool:
    """
    사용자 커스텀 클레임 설정 (권한 관리)
    
    Args:
        uid: Firebase 사용자 UID
        claims: 설정할 클레임 (예: {"role": "admin"})
        
    Returns:
        성공 여부
    """
    try:
        auth_client = get_auth()
        auth_client.set_custom_user_claims(uid, claims)
        return True
    except Exception:
        return False


