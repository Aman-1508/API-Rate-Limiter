

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Lua-2C2D72?style=for-the-badge&logo=lua&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" />
  <img src="https://img.shields.io/badge/Neon-00E699?style=for-the-badge&logo=neon&logoColor=black" />
  <img src="https://img.shields.io/badge/Upstash-00C98D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Made%20with-❤️-red?style=flat-square" />
  <img src="https://img.shields.io/badge/Status-Live-success?style=flat-square" />
</p>

--




# 🚀 Distributed API Rate Limiter

A production-ready **Distributed API Rate Limiter** built with **Node.js, Express, Redis, PostgreSQL, and Docker**. The project supports multiple rate-limiting algorithms using **Redis Lua Scripts** and provides secure authentication through **JWT** and **API Keys**.

## 🌐 Live Demo

**API Base URL**

https://api-rate-limiter-rfmn.onrender.com

---

# ✨ Features

- 🔐 JWT Authentication
- 🔑 API Key Authentication
- 👤 User Registration & Login
- 🗝️ API Key Management
- ⚡ Fixed Window Rate Limiting (Lua)
- 📈 Sliding Window Rate Limiting (Lua)
- 🪣 Token Bucket Rate Limiting (Lua)
- 🧠 Strategy Pattern for Algorithm Switching
- 🚀 Redis for High Performance
- 🐘 PostgreSQL for Persistent Storage
- 🐳 Dockerized Application
- ☁️ Cloud Deployment (Render + Neon + Upstash)

---

# 🛠 Tech Stack

| Technology | Usage |
|------------|------|
| Node.js | Runtime |
| Express.js | REST API |
| PostgreSQL | User & API Key Storage |
| Redis | Rate Limiting |
| Lua | Atomic Redis Operations |
| JWT | Authentication |
| Docker | Containerization |
| Neon | Cloud PostgreSQL |
| Upstash | Cloud Redis |
| Render | Deployment |

---

# 📂 Project Structure

```
backend
│
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── services
│   │   └── rateLimiter
│   ├── utils
│   └── server.js
│
├── database
│   └── schema.sql
│
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

# 🔐 Authentication

The project supports two authentication methods.

### 1. JWT Authentication

```
Authorization: Bearer <JWT_TOKEN>
```

### 2. API Key Authentication

```
x-api-key: YOUR_API_KEY
```

---

# 🚦 Rate Limiting Algorithms

## Fixed Window

- Uses Redis Counters
- Implemented using Lua Script
- Fastest implementation
- Good for simple APIs

---

## Sliding Window

- Uses Redis Sorted Sets
- More accurate than Fixed Window
- Prevents burst traffic near window boundaries

---

## Token Bucket

- Allows controlled bursts
- Smooth request distribution
- Best suited for production APIs

---

# 🔄 Strategy Pattern

Algorithms can be switched by changing a single configuration value.

```javascript
algorithm: "fixed"

algorithm: "sliding"

algorithm: "tokenBucket"
```

No route or controller changes are required.

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/profile |

---

## API Keys

| Method | Endpoint |
|---------|----------|
| POST | /api/keys |
| GET | /api/keys |
| PATCH | /api/keys/:id |
| DELETE | /api/keys/:id |

---

# 🐳 Docker

Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
```

Go inside backend

```bash
cd backend
```

Build

```bash
docker compose up --build
```

---

# ⚙️ Environment Variables

Create a `.env` file.

```
PORT=5000

DATABASE_URL=

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

REDIS_URL=

REDIS_HOST=
REDIS_PORT=

JWT_SECRET=
JWT_EXPIRES_IN=1d
```

---

# 🧪 Testing

The API has been tested using Postman.

Tested features include:

- User Registration
- Login
- JWT Authentication
- API Key Authentication
- API Key CRUD
- Fixed Window
- Sliding Window
- Token Bucket
- Docker Deployment

---

# 🚀 Deployment

The application is deployed using:

- Render
- Neon PostgreSQL
- Upstash Redis

---

# 📈 Future Improvements

- Redis Cluster Support
- Dynamic Algorithm Switching
- Rate Limiting Analytics Dashboard
- Prometheus Metrics
- Kubernetes Deployment
- CI/CD Pipeline
- OpenAPI / Swagger Documentation

---

# 👨‍💻 Author

**Aman Singh**

- MCA, NIT Jamshedpur
- MERN Stack Developer
- Java | DSA | Backend Development

---

# ⭐ If you found this project helpful, consider giving it a star!
