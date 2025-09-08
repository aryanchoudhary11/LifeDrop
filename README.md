# 🩸 LifeDrop – Blood Donor Management System

LifeDrop is a **full-stack MERN application** that connects blood donors with recipients in need.  
It ensures **secure authentication, donor registration, and easy donor discovery** through a modern and responsive UI.

---

## 🚀 Features

- 🔐 **Secure Authentication**
  - JWT-based access & refresh tokens
  - HTTP-only cookies for refresh token storage
  - Automatic token refresh & session management

- 📧 **Email Verification**
  - One-click email verification flow
  - Prevents fake or spam donor accounts

- 🩸 **Donor Management**
  - Verified users can register as donors
  - Donors can edit/update their details (blood type, city, phone, visibility, availability)

- 🔎 **Donor Discovery**
  - Search donors by **pincode** and **blood type**
  - Only available & visible donors are listed

- 🎨 **Modern UI**
  - Built with **React + TailwindCSS + Framer Motion**
  - Fully responsive & mobile-friendly
  - Classic **Hero Section, Donor Directory, Profile Page**

- 🛡️ **Security Focus**
  - Passwords hashed with **bcrypt**
  - Refresh token reuse detection
  - Token revocation & secure logout

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- TailwindCSS
- Framer Motion
- Axios (with interceptors for token refresh)

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT & Refresh Token Strategy
- Bcrypt.js for password hashing

**Other**
- REST APIs
- Cookie-based session security
- MVC architecture

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```
git clone https://github.com/aryanchoudhary11/LifeDrop.git
cd LifeDrop
```

### 2️⃣ Backend Setup
```
cd Backend
npm install
```
- Create a .env file inside server/ with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

- Run the backend:
```
npm start
```

### 3️⃣ Frontend Setup

```
cd ../Frontend
npm install
npm run dev
```

### 🔐 Security Highlights

- JWT Access Token (short-lived: 1 min)
- Refresh Token (stored in HTTP-only cookies, 7 days validity)
- Refresh Token Reuse Detection & Revocation
- Enforced Email Verification before donor registration
- Hashed Passwords with bcrypt

## Link:- 
https://lifedrop-by-aryan-choudhary.netlify.app/
