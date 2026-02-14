"""
API 라우터 모듈
"""
from fastapi import APIRouter
from app.api import users, clubs, recommendations, test_recommendations, auth, subscriptions, events, announcements, upload, bookmarks, notifications
from app.api.admin import leader_requests, superadmin

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(clubs.router)
api_router.include_router(subscriptions.router)
api_router.include_router(events.router)
api_router.include_router(announcements.router)
api_router.include_router(upload.router)
api_router.include_router(bookmarks.router)
api_router.include_router(notifications.router)
api_router.include_router(recommendations.router)
api_router.include_router(test_recommendations.router)
api_router.include_router(leader_requests.router)
api_router.include_router(superadmin.router)

__all__ = ['api_router']
