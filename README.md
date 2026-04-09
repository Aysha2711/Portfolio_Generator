# 🚀 Developer Portfolio Generator

A full-stack MERN application that allows developers to create, manage, and share personalized portfolio websites with unique public URLs.

---

## 📌 Features

- User Authentication (JWT-based login & registration)
- Personalized Dashboard for managing portfolios
- Dynamic Portfolio Creation (Skills, Projects, Experience)
- Live Preview before publishing
- Public Shareable Portfolio Links (`/portfolio/:username`)
- Edit & Update Portfolio anytime
- Fully Responsive UI (Mobile + Desktop)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Authentication
- JWT (JSON Web Tokens)
- bcryptjs

---

## 📁 Project Structure
- client/ → React frontend
- server/ → Node.js backend


---

## ⚙️ Environment Variables

Create a `.env` file inside the `/server` folder:
Create a `.env` file inside the `/client` folder:

--- env server
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

--- env client
VITE_API_URL=your_api_url


## Prerequisites
- Node.js installed
- MongoDB Atlas or local MongoDB

## Setup Backend
- cd server
- npm install
- npm run dev
  
## Setup Frontend
- cd client
- npm install
- npm run dev

## Deployment
- Frontend: Vercel
- Backend: Railway

## Notes
- .env file is not included for security reasons
- Sensitive data (MongoDB URI, JWT secret) must be configured manually
- Commit history reflects development progress
- screenshots of pages include in /screeshots
