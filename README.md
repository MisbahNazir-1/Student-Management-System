# Student-Management-System
A professional Full-Stack Student Management System built with the MERN stack (MongoDB, Express, React, Node.js) featuring complete CRUD operations and secure JWT authentication.

# 🎒 Student Management System (SMS) - MERN Stack

A professional, full-stack enterprise web application built to streamline academic administration, manage student profiles, track progress, and organize school records.

## 🚀 Key Features & CRUD Operations

This application implements secure **Authentication** alongside strict **CRUD** design principles:
* **Authentication:** Secure user registration and login modules powered by **JWT (JSON Web Tokens)** and password hashing.
* **Create (POST):** Seamlessly register new students, upload profile pictures, and initialize enrollment data.
* **Read (GET):** Real-time comprehensive student directories with dynamic search filters, pagination, and multi-parameter indexing.
* **Update (PUT/PATCH):** Advanced record modification modules for continuous grading updates, personal bio changes, and attendance tracking.
* **Delete (DELETE):** Secure removal procedures for student files with cascading relational safeguards in the database.

## 🛠️ Tech Stack & Architecture

* **Frontend:** React.js, Vite, CSS, Context API (Auth Context)
* **Backend:** Node.js, Express.js, JWT (JSON Web Tokens), Bcrypt.js
* **Database:** MongoDB (Mongoose ORM)

## 🔑 Authentication & Environment Setup

The backend uses token-based authentication to secure endpoints. Create a `.env` file in the `backend/` directory and configure the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
```

### Authentication Architecture
1. **Register (`POST /api/auth/register`):** Creates a new administrator/user account and hashes the password before saving.
2. **Login (`POST /api/auth/login`):** Verifies the password and returns a signed **JWT Token** to the client.
3. **Route Protection:** A custom middleware checks for the JWT in the request headers before granting access to Student CRUD operations.

## 📁 Repository Directory Structure

```text
Student-Management-System/
├── frontend/         # React single-page application user client interface
│   ├── src/
│   │   ├── context/  # AuthContext for managing login state
│   │   └── pages/    # Login, Register, and Dashboard components
└── backend/          # Node/Express API logic server and database routing
    ├── middleware/   # JWT verification middleware
    ├── models/       # User & Student schemas
    └── routes/       # Auth routes (login/register) & Student routes
```
