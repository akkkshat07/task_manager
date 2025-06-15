# Task Manager Pro

A full-stack task management application built with React, TypeScript, Node.js, and MongoDB. This project helps users organize their tasks efficiently with features like user authentication, task categorization, drag-and-drop interface, and real-time updates.

## 🚀 Features

- **User Authentication**: Secure login and registration system with JWT tokens
- **Task Management**: Create, edit, delete, and organize tasks
- **Drag & Drop**: Intuitive drag-and-drop interface for task organization
- **Task Filtering**: Search and filter tasks by status, priority, or category
- **Real-time Updates**: Instant task updates without page refresh
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Task Statistics**: Visual dashboard showing task completion stats
- **Protected Routes**: Secure access to user-specific content

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router DOM** - Navigation
- **Tailwind CSS** - Styling
- **React Beautiful DnD** - Drag and drop functionality
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **CORS** - Cross-origin requests

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## 🔧 Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd "Task Manager App"
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

4. **Environment Variables**
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

5. **Start MongoDB**
Make sure MongoDB is running on your system.

## 🚀 Running the Application

### Development Mode

1. **Start the backend server**
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

### Production Mode

1. **Build the backend**
```bash
cd backend
npm run build
npm start
```

2. **Build the frontend**
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
Task Manager App/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store
│   │   ├── styles/         # CSS files
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   └── main.tsx        # React entry point
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🎨 Features Overview

### Authentication System
- Secure user registration and login
- JWT-based authentication
- Protected routes and middleware
- Password hashing with bcrypt

### Task Management
- Create tasks with title, description, priority, and due date
- Mark tasks as complete/incomplete
- Edit task details
- Delete unwanted tasks
- Drag and drop task reordering

### User Interface
- Clean, modern design with Tailwind CSS
- Responsive layout for all devices
- Toast notifications for user feedback
- Loading states and error handling
- Intuitive navigation and user experience

## 🚧 Future Enhancements

- [ ] Task categories and tags
- [ ] Due date reminders
- [ ] Task sharing and collaboration
- [ ] File attachments
- [ ] Dark mode toggle
- [ ] Export tasks to PDF/CSV
- [ ] Mobile app version
- [ ] Email notifications

## 🐛 Known Issues

- None at the moment. If you find any bugs, please create an issue!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ If you found this project helpful, please give it a star!
