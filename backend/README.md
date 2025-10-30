LIFELOOP Backend (hackathon-ready)

Quick start

- Install: npm install
- Initialize DB: npm run migrate
- Start: npm run dev (requires nodemon) or npm start

Endpoints

- POST /auth/signup { name, email, password } -> { user, token }
- POST /auth/login { email, password } -> { user, token }

Protected (Authorization: Bearer <token>)
- POST /api/simulate (multipart/form-data) fields: file (CSV), title, event_type, optional question -> { id, result, graph_data }
- GET /api/history -> list simulations for user
- GET /api/simulation/:id -> details + history + files + graph_data
- POST /api/rerun/:id { optional question } -> rerun using stored CSV
- GET /api/report/:id -> ZIP download (simulation JSON + CSVs)

Utilities
- migrations/init.sql sets up SQLite schema
- scripts/migrate.js applies migrations

Notes
- This backend uses SQLite (better-sqlite3). Keep JWT_SECRET in .env for production.
