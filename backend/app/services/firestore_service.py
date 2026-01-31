"""
Firestore 데이터베이스 서비스
"""
from typing import Optional, List, Dict, Any
from datetime import datetime
from firebase_admin import firestore
from app.services.firebase_admin import get_firestore


class FirestoreService:
    """Firestore CRUD 작업을 위한 서비스 클래스"""
    
    def __init__(self):
        self.db = None
    
    def _get_db(self):
        """Firestore 클라이언트 가져오기 (Lazy 로딩)"""
        if self.db is None:
            self.db = get_firestore()
            if self.db is None:
                raise RuntimeError("Firestore가 초기화되지 않았습니다. Firebase 환경 변수를 확인하세요.")
        return self.db
    
    async def create_document(
        self,
        collection: str,
        document_id: str,
        data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """문서 생성"""
        db = self._get_db()
        doc_ref = db.collection(collection).document(document_id)
        
        data['created_at'] = firestore.SERVER_TIMESTAMP
        data['updated_at'] = firestore.SERVER_TIMESTAMP
        
        doc_ref.set(data)
        
        doc = doc_ref.get()
        return {'id': doc.id, **doc.to_dict()}
    
    async def get_document(
        self,
        collection: str,
        document_id: str
    ) -> Optional[Dict[str, Any]]:
        """문서 조회"""
        db = self._get_db()
        doc_ref = db.collection(collection).document(document_id)
        doc = doc_ref.get()
        
        if doc.exists:
            return {'id': doc.id, **doc.to_dict()}
        return None
    
    async def update_document(
        self,
        collection: str,
        document_id: str,
        data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """문서 업데이트"""
        db = self._get_db()
        doc_ref = db.collection(collection).document(document_id)
        
        data['updated_at'] = firestore.SERVER_TIMESTAMP
        
        doc_ref.update(data)
        
        doc = doc_ref.get()
        return {'id': doc.id, **doc.to_dict()}
    
    async def set_document(
        self,
        collection: str,
        document_id: str,
        data: Dict[str, Any],
        merge: bool = True
    ) -> Dict[str, Any]:
        """문서 설정 (생성 또는 병합)"""
        db = self._get_db()
        doc_ref = db.collection(collection).document(document_id)
        
        if merge:
            data['updated_at'] = firestore.SERVER_TIMESTAMP
            existing_doc = doc_ref.get()
            if not existing_doc.exists:
                data['created_at'] = firestore.SERVER_TIMESTAMP
        else:
            data['created_at'] = firestore.SERVER_TIMESTAMP
            data['updated_at'] = firestore.SERVER_TIMESTAMP
        
        doc_ref.set(data, merge=merge)
        
        doc = doc_ref.get()
        return {'id': doc.id, **doc.to_dict()}
    
    async def delete_document(
        self,
        collection: str,
        document_id: str
    ) -> bool:
        """문서 삭제"""
        db = self._get_db()
        doc_ref = db.collection(collection).document(document_id)
        doc_ref.delete()
        return True
    
    async def query_documents(
        self,
        collection: str,
        filters: Optional[List[tuple]] = None,
        order_by: Optional[str] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None
    ) -> List[Dict[str, Any]]:
        """문서 쿼리"""
        db = self._get_db()
        query = db.collection(collection)
        
        if filters:
            for field, operator, value in filters:
                query = query.where(field, operator, value)
        
        if order_by:
            query = query.order_by(order_by)
        
        if offset:
            query = query.offset(offset)
        
        if limit:
            query = query.limit(limit)
        
        docs = query.stream()
        
        return [{'id': doc.id, **doc.to_dict()} for doc in docs]
    
    async def count_documents(
        self,
        collection: str,
        filters: Optional[List[tuple]] = None
    ) -> int:
        """문서 개수 세기"""
        db = self._get_db()
        query = db.collection(collection)
        
        if filters:
            for field, operator, value in filters:
                query = query.where(field, operator, value)
        
        docs = query.stream()
        return len(list(docs))


class UserService(FirestoreService):
    """사용자 관련 Firestore 작업"""
    
    COLLECTION = 'users'
    
    async def create_user_profile(
        self,
        uid: str,
        email: str,
        display_name: str,
        role: str = 'student',
        interests: List[str] = None
    ) -> Dict[str, Any]:
        """사용자 프로필 생성"""
        data = {
            'email': email,
            'display_name': display_name,
            'role': role,
            'interests': interests or [],
            'recommendation_preferences': None
        }
        return await self.create_document(self.COLLECTION, uid, data)
    
    async def get_user_profile(self, uid: str) -> Optional[Dict[str, Any]]:
        """사용자 프로필 조회"""
        return await self.get_document(self.COLLECTION, uid)
    
    async def update_user_interests(
        self,
        uid: str,
        interests: List[str]
    ) -> Dict[str, Any]:
        """사용자 관심사 업데이트"""
        return await self.update_document(
            self.COLLECTION,
            uid,
            {'interests': interests}
        )
    
    async def update_recommendation_preferences(
        self,
        uid: str,
        preferred_categories: List[str],
        preferred_activity_types: List[str],
        available_time_slots: List[str],
        source: str = 'ai-form'
    ) -> Dict[str, Any]:
        """추천 선호도 업데이트"""
        preferences = {
            'preferred_categories': preferred_categories,
            'preferred_activity_types': preferred_activity_types,
            'available_time_slots': available_time_slots,
            'last_updated': firestore.SERVER_TIMESTAMP,
            'source': source
        }
        return await self.update_document(
            self.COLLECTION,
            uid,
            {'recommendation_preferences': preferences}
        )


class ClubService(FirestoreService):
    """동아리 관련 Firestore 작업"""
    
    COLLECTION = 'clubs'
    
    async def create_club(
        self,
        club_id: str,
        name: str,
        description: str,
        categories: List[str],
        activity_type: str,
        **kwargs
    ) -> Dict[str, Any]:
        """동아리 생성"""
        data = {
            'name': name,
            'description': description,
            'categories': categories,
            'activity_type': activity_type,
            'tags': kwargs.get('tags', []),
            'meeting_schedule': kwargs.get('meeting_schedule'),
            'leaders': kwargs.get('leaders', []),
            'contact_email': kwargs.get('contact_email'),
            'stats': {
                'total_members': 0,
                'total_subscribers': 0,
                'total_events': 0,
                'view_count': 0,
                'established_date': kwargs.get('established_date')
            },
            'logo_url': kwargs.get('logo_url'),
            'banner_url': kwargs.get('banner_url'),
            'media_urls': kwargs.get('media_urls', []),
            'is_active': True
        }
        return await self.create_document(self.COLLECTION, club_id, data)
    
    async def get_club(self, club_id: str) -> Optional[Dict[str, Any]]:
        """동아리 조회"""
        return await self.get_document(self.COLLECTION, club_id)
    
    async def get_clubs(
        self,
        categories: Optional[List[str]] = None,
        activity_type: Optional[str] = None,
        limit: int = 50,
        offset: int = 0
    ) -> List[Dict[str, Any]]:
        """동아리 목록 조회"""
        filters = []
        
        if categories:
            filters.append(('categories', 'array_contains_any', categories))
        
        if activity_type:
            filters.append(('activity_type', '==', activity_type))
        
        filters.append(('is_active', '==', True))
        
        return await self.query_documents(
            self.COLLECTION,
            filters=filters,
            order_by='name',
            limit=limit,
            offset=offset
        )
    
    async def update_club(
        self,
        club_id: str,
        data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """동아리 정보 업데이트"""
        return await self.update_document(self.COLLECTION, club_id, data)
    
    async def increment_view_count(self, club_id: str) -> None:
        """동아리 조회수 증가"""
        db = self._get_db()
        doc_ref = db.collection(self.COLLECTION).document(club_id)
        doc_ref.update({
            'stats.view_count': firestore.Increment(1)
        })


# 전역 서비스 인스턴스
user_service = UserService()
club_service = ClubService()
firestore_service = FirestoreService()

