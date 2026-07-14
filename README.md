# TaskFlow

TaskFlow is a full-stack task management application built using the MERN stack. It allows users to securely manage daily tasks with authentication, email verification, profile management, and an intuitive dashboard.

## Features

### Authentication
- User Registration
- Email OTP Verification
- Login & Logout
- JWT Authentication
- Protected Routes
- Forgot Password
- Reset Password
- Change Password

### Task Management
- Create Todo
- Update Todo
- Delete Todo
- Mark Todo as Completed
- Dashboard Statistics
- Priority Levels
- Date & Time Validation

### Profile Management
- Update Profile
- Upload Profile Picture (Cloudinary)
- Remove Profile Picture
- Delete Account

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Zod
- Nodemailer
- Cloudinary

## Project Structure

```
TaskFlow
│
├── Client
│
└── Server
```

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/taskflow-mern.git
```

### Install Dependencies

Frontend

```bash
cd Client
npm install
```

Backend

```bash
cd Server
npm install
```

### Environment Variables

Create a `.env` file inside both the Client and Server directories.

### Start Development Server

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

## Future Improvements

- Search Todos
- Todo Filtering
- Todo Sorting
- Responsive Enhancements
- Deployment
- Dark Mode

## License

This project is intended for educational and portfolio purposes.
