"""
Users API 엔드포인트
"""
from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import (
    UserProfileCreate,
    UserProfileUpdate,
    UserProfileResponse,
    RecommendationPreferencesUpdate
)
from app.api.dependencies import get_current_user
from app.services.firestore_service import user_service

router = APIRouter(prefix="/api/users", tags=["users"])


@router.post("/profile", response_model=UserProfileResponse, status_code=status.HTTP_201_CREATED)
async def create_or_update_profile(
    profile_data: UserProfileCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    사용자 프로필 생성 또는 업데이트
    
    - 첫 로그인 시 프로필 생성
    - 이미 존재하면 업데이트
    """
    uid = current_user['uid']
    email = current_user.get('email', '')
    
    existing_profile = await user_service.get_user_profile(uid)
    
    if existing_profile:
        updated_data = {}
        if profile_data.display_name:
            updated_data['display_name'] = profile_data.display_name
        if profile_data.interests:
            updated_data['interests'] = profile_data.interests
        
        result = await user_service.update_document(
            user_service.COLLECTION,
            uid,
            updated_data
        )
    else:
        result = await user_service.create_user_profile(
            uid=uid,
            email=email,
            display_name=profile_data.display_name,
            interests=profile_data.interests
        )
    
    return UserProfileResponse(
        uid=result['id'],
        email=result['email'],
        display_name=result.get('display_name'),
        role=result.get('role', 'student'),
        interests=result.get('interests', []),
        recommendation_preferences=result.get('recommendation_preferences'),
        created_at=result.get('created_at'),
        updated_at=result.get('updated_at')
    )


@router.get("/profile", response_model=UserProfileResponse)
async def get_my_profile(current_user: dict = Depends(get_current_user)):
    """
    내 프로필 조회
    """
    uid = current_user['uid']
    
    profile = await user_service.get_user_profile(uid)
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found. Please create a profile first."
        )
    
    display_name = profile.get('display_name') or ''
    stored_first = profile.get('first_name')
    stored_last = profile.get('last_name')

    if stored_first is None and stored_last is None and display_name:
        parts = display_name.split(' ', 1)
        derived_first = parts[0]
        derived_last = parts[1] if len(parts) > 1 else ''
    else:
        derived_first = stored_first
        derived_last = stored_last

    return UserProfileResponse(
        uid=profile['id'],
        email=profile['email'],
        display_name=display_name or None,
        first_name=derived_first,
        last_name=derived_last,
        role=profile.get('role', 'student'),
        student_id=profile.get('student_id'),
        interests=profile.get('interests', []),
        recommendation_preferences=profile.get('recommendation_preferences'),
        created_at=profile.get('created_at'),
        updated_at=profile.get('updated_at')
    )


@router.put("/interests")
async def update_interests(
    profile_update: UserProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    사용자 관심사 업데이트
    """
    uid = current_user['uid']
    
    profile = await user_service.get_user_profile(uid)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    if profile_update.interests is not None:
        await user_service.update_user_interests(uid, profile_update.interests)
    
    return {"message": "Interests updated successfully"}


@router.post("/recommendation-preferences")
async def create_recommendation_preferences(
    preferences: RecommendationPreferencesUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    AI 추천 선호도 저장 (AI 폼에서 수집한 3가지 정보)
    
    - preferred_categories: 관심있는 클럽 카테고리
    - preferred_activity_types: 원하는 활동 유형
    - available_time_slots: 활동 가능한 시간대
    """
    uid = current_user['uid']
    
    profile = await user_service.get_user_profile(uid)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found. Please create a profile first."
        )
    
    await user_service.update_recommendation_preferences(
        uid=uid,
        preferred_categories=preferences.preferred_categories,
        preferred_activity_types=preferences.preferred_activity_types,
        available_time_slots=preferences.available_time_slots,
        source='ai-form'
    )
    
    return {
        "message": "Recommendation preferences saved successfully",
        "preferences": {
            "preferred_categories": preferences.preferred_categories,
            "preferred_activity_types": preferences.preferred_activity_types,
            "available_time_slots": preferences.available_time_slots
        }
    }


@router.get("/recommendation-preferences")
async def get_recommendation_preferences(
    current_user: dict = Depends(get_current_user)
):
    """
    저장된 추천 선호도 조회
    """
    uid = current_user['uid']
    
    profile = await user_service.get_user_profile(uid)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    preferences = profile.get('recommendation_preferences')
    
    if not preferences:
        return {
            "message": "No preferences found",
            "preferences": None
        }
    
    return {
        "message": "Preferences retrieved successfully",
        "preferences": preferences
    }


@router.put("/recommendation-preferences")
async def update_recommendation_preferences(
    preferences: RecommendationPreferencesUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    추천 선호도 업데이트
    """
    uid = current_user['uid']
    
    profile = await user_service.get_user_profile(uid)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    await user_service.update_recommendation_preferences(
        uid=uid,
        preferred_categories=preferences.preferred_categories,
        preferred_activity_types=preferences.preferred_activity_types,
        available_time_slots=preferences.available_time_slots,
        source='profile'
    )
    
    return {
        "message": "Recommendation preferences updated successfully"
    }


