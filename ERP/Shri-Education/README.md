# 🎓 SHRI Educational World - E-Learning Platform

> A complete Full Stack E-Learning Platform designed to provide quality education for CA (Chartered Accountancy) courses with separate Student and Admin panels.

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Features

### 🎯 Student Panel
- ✅ Dynamic landing page with customizable hero section
- ✅ Course browsing with search, filter, and sort
- ✅ Secure JWT authentication
- ✅ Razorpay payment integration
- ✅ Student dashboard with progress tracking
- ✅ Video lectures with React Player
- ✅ Downloadable PDF notes
- ✅ Live class integration (Agora SDK)
- ✅ Progress tracking and completion status
- ✅ Profile management

### 👨‍💼 Admin Panel
- ✅ Secure admin authentication
- ✅ Analytics dashboard (students, courses, revenue)
- ✅ Complete course management (CRUD)
- ✅ Module and video management
- ✅ Enrollment tracking
- ✅ Live class scheduling and management
- ✅ Hero section customization
- ✅ Student management
- ✅ Revenue tracking

### 🎨 UI/UX Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark/Light mode toggle
- ✅ Smooth animations (Framer Motion)
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ Form validation

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Payment**: Razorpay
- **Email**: Nodemailer
- **Security**: Helmet, Rate Limiting, XSS Protection

### Frontend
- **Framework**: React.js 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Video Player**: React Player
- **Notifications**: React Hot Toast
- **Live Classes**: Agora SDK

## 📁 Project Structure

```
ca-elearning-platform/
├── backend/
│   ├── src/
│   │   ├── models/              # 7 Mongoose models
│   │   │   ├── User.js          # Student & Admin users
│   │   │   ├── Course.js        # Course information
│   │   │   ├── Module.js        # Course modules with videos
│   │   │   ├── Enrollment.js    # Student enrollments
│   │   │   ├── Payment.js       # Payment records
│   │   │   ├── LiveClass.js     # Live class schedules
│   │   │   └── HeroSection.js   # Landing page content
│   │   ├── controllers/         # Business logic
│   │   ├── routes/              # API endpoints
│   │   ├── middleware/          # Auth & error handling
│   │   ├── config/              # Database, Cloudinary, Razorpay
│   │   ├── utils/               # Email service
│   │   ├── scripts/             # Admin seeder
│   │   └── server.js            # Entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # 18+ page components
│   │   │   ├── student/         # Student dashboard pages
│   │   │   └── admin/           # Admin panel pages
│   │   ├── context/             # Auth & Theme context
│   │   ├── services/            # API service layer
│   │   ├── utils/               # Helper functions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── .gitignore
├── README.md
├── SETUP_INSTRUCTIONS.md        # Detailed setup guide
└── PROJECT_SUMMARY.md            # Complete feature list
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16 or higher
- MongoDB (local or Atlas)
- Cloudinary account (free tier)
- Razorpay account (test mode)

### Installation

**1. Clone the repository**
```bash
git clone <repository-url>
cd ca-elearning-platform
```

**2. Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run seed          # Create admin user
npm run dev           # Start on port 5000
```

**3. Frontend Setup** (in a new terminal)
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev           # Start on port 5173
```

**4. Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Admin Login: admin@caelearning.com / Admin@123

> 📖 For detailed setup instructions, see [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

## 👤 Default Admin Credentials

After running the backend for the first time, use these credentials to login as admin:

- **Email**: admin@caelearning.com
- **Password**: Admin@123

⚠️ **Important**: Change these credentials immediately after first login!

## 🗄️ Database Collections

- **users**: Student and admin user data
- **courses**: Course information
- **modules**: Course modules with videos
- **enrollments**: Student course enrollments
- **payments**: Payment transactions
- **liveclasses**: Live class schedules
- **herosections**: Landing page hero content

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Student registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset
- `GET /api/auth/me` - Get current user

### Courses (Public)
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details

### Student Routes
- `GET /api/student/dashboard` - Student dashboard
- `GET /api/student/my-courses` - Enrolled courses
- `POST /api/student/enroll` - Enroll in course
- `GET /api/student/course/:id/content` - Course content

### Admin Routes
- `GET /api/admin/dashboard` - Admin analytics
- `POST /api/admin/courses` - Create course
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course
- `POST /api/admin/courses/:id/modules` - Add module
- `GET /api/admin/enrollments` - View enrollments
- `PUT /api/admin/hero-section` - Update hero section

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment

### Live Classes
- `POST /api/live/schedule` - Schedule live class
- `GET /api/live/upcoming` - Get upcoming classes
- `POST /api/live/start` - Start live session

## 🎨 UI Features

- Responsive design (mobile, tablet, desktop)
- Dark/Light mode toggle
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications
- Modal dialogs
- Progress indicators

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Set environment variables in hosting platform
2. Deploy from GitHub repository
3. Ensure MongoDB Atlas connection string is set

### Frontend Deployment (Vercel/Netlify)

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder
3. Set environment variables in hosting platform

## 📝 Development Guidelines

- Follow ESLint rules
- Use meaningful commit messages
- Test before pushing to production
- Keep dependencies updated
- Document new features

## 🔒 Security Features

- JWT authentication
- Password hashing (bcrypt)
- Role-based access control
- Input validation
- XSS protection
- CORS configuration
- Rate limiting

## 📧 Support

For issues and questions, please create an issue in the repository.

## 📄 License

MIT License - feel free to use this project for learning and commercial purposes.

---

Built with ❤️ for CA Students
