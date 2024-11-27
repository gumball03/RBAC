# React Role-Based Dashboard Application

This project is a **React-based application** that implements a **role-based authentication system** with protected routes. It includes separate functionalities for users and administrators, ensuring secure and efficient access to resources.

---

## 📋 Features

### Authentication:
- **Login and Signup functionality.**
- **JWT-based token authentication.**

### Role-Based Access:
- **Separate dashboards for users and administrators.**
- **Protected routes using `react-router-dom`.**

### Admin Dashboard:
- Full **CRUD (Create, Read, Update, Delete)** operations on user data.

### User Dashboard:
- View-only access to data for users.

### State Management:
- Context API for managing authentication states.

---

## 🛠️ Installation

Follow these steps to set up the project locally:

### Prerequisites
- **Node.js** (v16 or later)
- **npm** or **yarn**

### 🗂️ Project Structure

src
├── components
│   ├── Auth
│   │   ├── Login.js
│   │   ├── Signup.js
│   ├── Dashboard
│   │   ├── AdminDashboard.js
│   │   ├── UserDashboard.js
│   ├── Home
│       ├── Home.js
├── context
│   ├── AuthProvider.js
│   ├── ProtectedRoute.js
├── App.js
└── index.js


## 🔑 Authentication Workflow

### Signup:
- Sends `email` and `password` to the `/api/v1/authentication/signup` endpoint.
- Creates a new user in the backend.

### Login:
- Sends credentials to the `/api/v1/authentication/login` endpoint.
- Receives a JWT token, which is decoded and stored locally.

### Protected Routes:
- The `ProtectedRoute` component restricts access based on the user's role (`admin` or `user`).

---

## 🛡️ Technologies Used

### Frontend:
- React.js
- Context API for state management
- `react-router-dom` for routing

### Backend (API expected):
- Node.js with Express
- JWT for authentication

### Styling:
- Tailwind CSS

---

## 🐞 Debugging & Testing

### Common Issues:

1. **Invalid JWT Token:**
   - Ensure the backend is correctly issuing tokens with required claims (`email`, `userType`).

2. **Role-Based Access Errors:**
   - Verify that roles are correctly mapped in the `ProtectedRoute` component.
