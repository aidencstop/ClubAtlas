"""
Subscription 데이터 모델
"""
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field


class Subscription(BaseModel):
    """구독 정보"""
    id: Optional[str] = None
    user_id: str = Field(..., description="구독자 UID")
    club_id: str = Field(..., description="동아리 ID")
    subscribed_at: datetime = Field(default_factory=datetime.now)
    is_active: bool = True
    notification_enabled: bool = True


class SubscriptionCreate(BaseModel):
    """구독 생성 요청"""
    club_id: str


class SubscriptionUpdate(BaseModel):
    """구독 업데이트 요청"""
    notification_enabled: Optional[bool] = None


class SubscriptionResponse(BaseModel):
    """구독 정보 응답"""
    id: str
    user_id: str
    club_id: str
    subscribed_at: datetime
    is_active: bool
    notification_enabled: bool


class SubscriptionListResponse(BaseModel):
    """구독 목록 응답"""
    subscriptions: List[SubscriptionResponse]
    total: int


