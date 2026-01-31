"""
API 라우터 모듈
"""
from fastapi import APIRouter
from app.api import users, clubs, recommendations, test_recommendations

api_router = APIRouter()

api_router.include_router(users.router)
api_router.include_router(clubs.router)
api_router.include_router(recommendations.router)
api_router.include_router(test_recommendations.router)

__all__ = ['api_router']
