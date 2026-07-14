# TaskFlow Server

This directory contains the backend API for the TaskFlow application.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Zod
- Nodemailer
- Cloudinary

## Features

- User Authentication
- JWT Authorization
- Email OTP Verification
- Password Reset
- Todo CRUD Operations
- Dashboard Statistics
- Profile Management

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Environment Variables

Create a `.env` file.

Example:

```env
PORT=
MONGO_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
CLIENT_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Folder Structure

```
Server
│
├── config
├── controllers
├── middlewares
├── models
├── routes
├── service
├── utils
├── validators
└── server.js
```

## API Features

### Authentication

- Signup
- Verify OTP
- Login
- Logout
- Forgot Password
- Reset Password

### Profile

- Get Profile
- Update Profile
- Change Password
- Delete Account

### Todos

- Create Todo
- Get Todos
- Update Todo
- Delete Todo
- Toggle Todo
- Dashboard Statistics
