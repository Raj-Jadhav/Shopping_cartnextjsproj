
# 🛒 Shopping Cart Application (Next.js + Django REST)

A full-stack **Shopping Cart web application** built using **Next.js
(App Router)** for the frontend and **Django REST Framework (DRF)** for
the backend.

## 🚀 Project Overview

This project demonstrates modern full-stack development with JWT
authentication, clean architecture, and real-world best practices.

## 🧱 Tech Stack

### Frontend

-   Next.js (App Router)
-   TypeScript
-   Tailwind CSS
-   React Hook Form
-   Zod

### Backend

-   Django
-   Django REST Framework
-   Django Simple JWT
-   SQLite

## 📁 Project Structure

Frontend and backend are separated for clean scalability.

## 🔐 Authentication

JWT-based authentication with access and refresh tokens.

## ⚙️ Environment Variables

Create `.env.local` in frontend:

    NEXT_PUBLIC_API_URL=http://localhost:8000/api

## 🛠️ Setup Instructions

### Backend

``` bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```

## 🧪 API Endpoints

-   POST `/api/auth/register/`
-   POST `/api/auth/login/`
-   POST `/api/items/`

## 🚧 Future Improvements

-   Protected routes
-   Token refresh handling
-   Cart and checkout

## 👨‍💻 Author

Raj
