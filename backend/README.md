LIFELOOP backend

Run:
- copy `.env.example` to `.env` and set MONGO_URI and JWT_SECRET
- npm install
- npm run dev

Endpoints summary:
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/simulate/upload (auth, multipart file=file)
- POST /api/simulate/ask (auth)
- GET /api/history (auth)
- GET /api/history/:id (auth)
- POST /api/history/:id/resume (auth)
- GET /api/history/:id/download (auth)
