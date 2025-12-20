# ClubAtlas Backend

Python FastAPI 기반 백엔드 서버

## 설치

```bash
# 가상환경 생성 (권장)
python -m venv venv

# 가상환경 활성화
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# 의존성 설치
pip install -r requirements.txt
```

## 환경 변수 설정

`.env` 파일을 생성하여 환경 변수를 설정할 수 있습니다 (선택사항):

```bash
# .env 파일 생성
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
PORT=8000
HOST=0.0.0.0
```

환경 변수를 설정하지 않으면 기본값이 사용됩니다.

## 실행

### 방법 1: run.py 스크립트 사용 (권장)

```bash
python run.py
```

### 방법 2: uvicorn 직접 실행

```bash
# 개발 서버 실행
uvicorn app.main:app --reload --port 8000

# 또는
python -m uvicorn app.main:app --reload --port 8000
```

서버는 `http://localhost:8000`에서 실행됩니다.

API 문서는 `http://localhost:8000/docs`에서 확인할 수 있습니다.

## 프로젝트 구조

```
backend/
├── app/
│   ├── main.py          # FastAPI 앱 진입점
│   ├── api/             # API 엔드포인트
│   ├── models/          # 데이터 모델
│   ├── services/        # 비즈니스 로직
│   │   ├── llm_service.py      # LLM 연결 서비스
│   │   └── recommendation.py   # 협업 필터링 서비스
│   └── utils/           # 유틸리티 함수
├── run.py               # 실행 스크립트
├── requirements.txt     # Python 의존성
└── README.md
```

## API 엔드포인트

### 기본 엔드포인트

- `GET /` - API 상태 확인
- `GET /health` - 헬스체크
- `GET /docs` - Swagger UI 문서
- `GET /redoc` - ReDoc 문서

## 향후 추가 예정

- 사용자 인증/인가
- 동아리 CRUD API
- 이벤트 관리 API
- 구독 시스템 API
- LLM 기반 추천 API
- 협업 필터링 API

