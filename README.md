# FamilyPulse

A full-stack home healthcare management platform that connects guardians, nurses, and administrators to coordinate care for dependents. Built for CodeYatra 2.0 (SoloPenguin).

---

## Overview

FamilyPulse streamlines the process of scheduling home nurse visits for family members (dependents), managing visit lifecycles, recording health reports, and making payments — all with an AI-powered report summarization feature.

### User Roles

| Role | Capabilities |
|------|-------------|
| **User (Guardian)** | Add dependents, schedule visits, view reports, make payments |
| **Nurse** | View assigned visits, start/complete visits, create and manage health reports |
| **Admin** | View all visits and nurses, assign nurses to visits |

---

## Tech Stack

### Backend
- **Django 6** + **Django REST Framework** — API server
- **Simple JWT** — Authentication
- **Stripe** — Payment processing
- **LangChain + Google Gemini** — AI-powered medical report summarization
- **drf-spectacular** — Auto-generated API docs (Swagger/Redoc)
- **SQLite** — Database (dev)

### Frontend
- **React 19** + **Vite**
- **Tailwind CSS v4**
- **React Router v7**
- **Axios / Fetch API**

---

## Features

- **Authentication** — JWT-based login/signup with role-aware routing
- **Dependents Management** — Guardians can add/remove family members
- **Visit Scheduling** — Schedule nurse visits with service type and timing
- **Visit Lifecycle** — Admin assigns nurse → Nurse starts → Nurse completes
- **Health Reports** — Nurses record vitals (weight, haemoglobin, platelets, BP, heartbeat, notes)
- **AI Summaries** — Patient-friendly report summaries generated via Google Gemini
- **Payments** — Stripe Checkout integration for completed visits
- **Role-based Dashboards** — Separate UIs for users, nurses, and admins

---

## Project Structure

```
├── backend/
│   ├── apps/
│   │   ├── users/          # Auth, user model (USER / NURSE / ADMIN roles)
│   │   ├── dependents/     # Guardian's family members
│   │   ├── visits/         # Visit scheduling and lifecycle
│   │   ├── reports/        # Medical health reports
│   │   ├── smartai/        # AI report summarization (Gemini)
│   │   ├── payment/        # Stripe payment integration
│   │   ├── notifications/  # (Scaffolded)
│   │   └── vitals/         # (Scaffolded)
│   ├── config/             # Django settings, URLs, WSGI/ASGI
│   └── core/               # Shared utils, exceptions, pagination
└── frontend/
    └── src/
        ├── pages/
        │   ├── user/       # Dashboard, Dependents, Visits
        │   ├── nurse/      # NurseVisits, NurseReports
        │   ├── admin/      # AdminDashboard, AdminNurses, AdminVisits
        │   └── shared/     # Reports (guardian + admin view)
        ├── components/     # Layout, UI primitives
        ├── context/        # AuthContext
        └── api/            # API client (fetch wrappers)
```

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- A Google Gemini API key
- A Stripe account (test keys)

### Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your keys (see Environment Variables below)

# Run migrations
python manage.py migrate

# Create a superuser (optional)
python manage.py createsuperuser

# Start the development server
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and connects to the backend at `http://127.0.0.1:8000`.

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
SECRET_KEY=your-django-secret-key
STRIPE_SECRET_KEY=sk_test_...
GOOGLE_API_KEY=your-gemini-api-key
GOOGLE_MODEL_NAME=gemini-1.5-flash
GOOGLE_MODEL_PROVIDER=google_genai
```

---

## API Documentation

With the backend running, visit:

- **Swagger UI** → `http://127.0.0.1:8000/api/docs/`
- **Redoc** → `http://127.0.0.1:8000/api/redoc/`

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/register/` | Sign up |
| `POST` | `/api/users/login/` | Log in (returns JWT) |
| `GET/POST` | `/api/dependents/` | List / create dependents |
| `GET/POST` | `/api/visits/` | Guardian: list / schedule visits |
| `GET` | `/api/nurse/visits/` | Nurse: list assigned visits |
| `PUT` | `/api/nurse/visits/{id}/start/` | Nurse: start a visit |
| `PUT` | `/api/nurse/visits/{id}/complete/` | Nurse: complete a visit |
| `GET` | `/api/admin/visits/` | Admin: all visits |
| `PUT` | `/api/admin/visits/{id}/assign/` | Admin: assign nurse |
| `GET/POST` | `/api/reports/` | List / create health reports |
| `POST` | `/api/ai/create/` | Generate AI summary for a report |
| `POST` | `/payments/create/` | Create Stripe checkout session |

---

## Visit Lifecycle

```
SCHEDULED → (Admin assigns nurse) → ASSIGNED → (Nurse starts) → STARTED → (Nurse completes) → COMPLETED → (Guardian pays) → PAID
```

---

## Service Pricing

| Service | Price |
|---------|-------|
| Vitals Check | $10.00 |
| Full Body Check | $25.00 |
| Follow-up Consultation | $15.00 |

---

## AI Report Summarization

After a nurse submits a health report, any authorized user (guardian, nurse, or admin) can request an AI-generated plain-language summary. The summary includes key vitals findings and nurse notes, translated into easy-to-understand language for patients and their families, powered by **Google Gemini** via LangChain.

---

## License

Built for CodeYatra 2.0 Hackathon by SoloPenguin.