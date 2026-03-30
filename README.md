# 🏢 Employee Management System

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) Employee Management System with role-based authentication, leave management, a complaints & suggestions module, and automated email notifications.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Modules](#-modules)
- [API Overview](#-api-overview)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🔐 **Authentication & Authorization** — Secure JWT-based login with role-based access (Admin / Employee)
- 🏖️ **Leave Management** — Employees can apply for leave; admins can approve or reject requests
- 📣 **Complaints & Suggestions** — Employees can raise complaints or submit suggestions; admins can manage and respond
- 📧 **Email Notifications** — Automated emails triggered on key actions (leave status updates, new complaints, etc.)
- 👤 **Employee Profiles** — Full CRUD for employee records
- 📊 **Admin Dashboard** — Overview of employees, pending leave requests, and open complaints

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI library |
| React Router | Client-side routing |
| Axios | HTTP requests |
| Context API / Redux | State management |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | REST API framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| Bcrypt.js | Password hashing |
| Nodemailer | Email notifications |

---

## 📁 Project Structure

```
management-app/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Page-level components
│       ├── context/         # Auth & global state
│       ├── services/        # Axios API calls
│       └── App.js
│
├── server/                  # Node/Express backend
│   ├── config/              # DB connection, env setup
│   ├── controllers/         # Route handler logic
│   ├── middleware/          # Auth, error handling
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express route definitions
│   └── server.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamHarshvardhan10/management-app.git
   cd management-app
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Variables

Create a `.env` file in the `server/` directory and configure the following:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Email (Nodemailer)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_FROM=no-reply@example.com

# Client URL (for CORS & email links)
CLIENT_URL=http://localhost:3000
```

### Running the App

**Development mode (both client & server):**

```bash
# From the root directory (if concurrently is set up)
npm run dev

# OR run separately:

# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm start
```

The app will be available at:
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000/api`

---

## 📦 Modules

### 🔐 Authentication
- Register and login for Admin and Employee roles
- JWT token stored securely (httpOnly cookie or localStorage)
- Protected routes on both frontend and backend

### 🏖️ Leave Management
- **Employee:** Apply for leave with start/end dates and reason
- **Admin:** View all pending leave requests; approve or reject with a note
- Email notification sent to employee upon status change

### 📣 Complaints & Suggestions
- **Employee:** Submit a complaint or suggestion with category and description
- **Admin:** View, manage, and respond to all submissions
- Status tracking: `Pending → In Review → Resolved`
- Email notification sent when a complaint is updated

### 👤 Employee Management (Admin Only)
- Add, edit, view, and delete employee records
- Assign roles and departments

---

## 🌐 API Overview

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user | Admin |
| `POST` | `/api/auth/login` | Login & get token | Public |
| `GET` | `/api/employees` | Get all employees | Admin |
| `GET` | `/api/employees/:id` | Get single employee | Auth |
| `PUT` | `/api/employees/:id` | Update employee | Admin |
| `DELETE` | `/api/employees/:id` | Delete employee | Admin |
| `POST` | `/api/leaves` | Apply for leave | Employee |
| `GET` | `/api/leaves` | Get all leaves | Admin |
| `PUT` | `/api/leaves/:id` | Approve/Reject leave | Admin |
| `POST` | `/api/complaints` | Submit complaint/suggestion | Employee |
| `GET` | `/api/complaints` | Get all complaints | Admin |
| `PUT` | `/api/complaints/:id` | Update complaint status | Admin |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by <a href="https://github.com/iamHarshvardhan10">Harshvardhan</a></p>
