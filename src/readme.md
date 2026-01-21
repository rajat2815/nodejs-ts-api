# LumosLex Backend

Backend API server for LumosLex (Translation automation platform).

## Tech Stack
- Node.js
- TypeScript
- Express

## Prerequisites
- Node.js 20.x
- Yarn 3.x

## Install (from repo root)
```bash
yarn install
Run Backend (Dev)
From repo root:

bash
Copy code
yarn backend:start:dev
Backend runs on:

http://localhost:3000

Build Backend
From repo root:

bash
Copy code
yarn workspace backend build
Run Backend (Production)
From repo root:

bash
Copy code
yarn backend:start
Test Endpoint
GET /
Returns:
Hello World from LumosLex Backend (TypeScript)!

yaml
Copy code

---

# ✅ Commit this README (recommended)

```bash
git add packages/backend/README.md
git commit -m "docs(backend): add backend README"
git push