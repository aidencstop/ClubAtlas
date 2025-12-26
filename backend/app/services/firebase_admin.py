"""
Firebase Admin SDK 초기화
"""
import os
import firebase_admin
from firebase_admin import credentials, firestore, auth
from app.config import settings


def initialize_firebase_admin():
    """Firebase Admin SDK 초기화"""
    if not firebase_admin._apps:
        # 환경 변수에서 Firebase 설정 가져오기
        project_id = os.getenv("FIREBASE_PROJECT_ID")
        private_key = os.getenv("FIREBASE_PRIVATE_KEY", "").replace("\\n", "\n")
        client_email = os.getenv("FIREBASE_CLIENT_EMAIL")
        
        if project_id and private_key and client_email:
            # 서비스 계정 키를 사용한 초기화
            cred = credentials.Certificate({
                "type": "service_account",
                "project_id": project_id,
                "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID", ""),
                "private_key": private_key,
                "client_email": client_email,
                "client_id": os.getenv("FIREBASE_CLIENT_ID", ""),
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_X509_CERT_URL", ""),
            })
            firebase_admin.initialize_app(cred)
        else:
            # 기본 자격 증명 사용 (GCP 환경에서 자동으로 인식)
            firebase_admin.initialize_app()
    
    return firebase_admin.get_app()


# Firebase Admin 초기화
initialize_firebase_admin()

# Firestore 및 Auth 인스턴스
db = firestore.client()
auth_client = auth


def get_firestore():
    """Firestore 클라이언트 반환"""
    return db


def get_auth():
    """Firebase Auth 클라이언트 반환"""
    return auth_client


