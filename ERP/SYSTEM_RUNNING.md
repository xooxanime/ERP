# 🚀 Shri Education Platform - System Running

## ✅ All Systems Operational

### Frontend Server
- **Status**: ✅ Running
- **URL**: http://localhost:5173/
- **Network**: http://192.168.1.15:5173/
- **Framework**: Vite + React
- **Port**: 5173

### Backend Server
- **Status**: ✅ Running
- **URL**: http://localhost:10000
- **Database**: MongoDB Connected (127.0.0.1:27017)
- **Framework**: Express.js
- **Port**: 10000
- **Environment**: Development

---

## 🔐 Login Credentials

### Admin Account
```
Email:    abhaypratapmishra5678@gmail.com
Password: Abhay1230!@
Role:     Admin
```

---

## 🌐 Access Points

### Frontend Application
Open your browser and navigate to:
```
http://localhost:5173/
```

### Backend API
```
http://localhost:10000/api
```

### Health Check
```
GET http://localhost:10000/api/health
```

---

## 📋 Quick Start Guide

### 1. Open Frontend
- Go to: **http://localhost:5173/**
- You should see the Shri Education Platform homepage

### 2. Login
- Click on "Login" or navigate to login page
- Enter credentials:
  - **Email**: abhaypratapmishra5678@gmail.com
  - **Password**: Abhay1230!@
- Click "Login"

### 3. Access Admin Dashboard
- After login, you'll be redirected to the admin dashboard
- You can manage courses, students, faculty, and more

---

## 🔧 Running Services

### Backend (Terminal 1)
```bash
npm run dev
# Running in: Shri-Education/backend
# Command: nodemon src/server.js
```

### Frontend (Terminal 2)
```bash
npm run dev
# Running in: Shri-Education/frontend
# Command: vite
```

---

## 📡 API Configuration

### Frontend API URL
```
VITE_API_URL=http://localhost:10000/api
```

### CORS Configuration
- Origin: * (All origins allowed)
- Credentials: true

---

## 🧪 Test the System

### 1. Test Backend Health
```bash
curl http://localhost:10000/api/health
```

### 2. Test Login API
```bash
curl -X POST http://localhost:10000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "abhaypratapmishra5678@gmail.com",
    "password": "Abhay1230!@"
  }'
```

### 3. Access Frontend
```
http://localhost:5173/
```

---

## 📚 Available Features

### Authentication
- ✅ User Registration
- ✅ User Login
- ✅ Password Reset
- ✅ Profile Management

### Admin Features
- ✅ Dashboard
- ✅ Course Management
- ✅ Student Management
- ✅ Faculty Management
- ✅ Payment Management
- ✅ Analytics
- ✅ Study Materials
- ✅ Progress Tracking

### Student Features
- ✅ Browse Courses
- ✅ Enroll in Courses
- ✅ View Course Content
- ✅ Track Progress
- ✅ Make Payments

---

## 🛠️ Troubleshooting

### Frontend not loading?
1. Check if Vite server is running on port 5173
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh (Ctrl+Shift+R)

### Backend connection error?
1. Verify backend is running on port 10000
2. Check MongoDB connection
3. Verify .env file configuration

### Login not working?
1. Ensure backend is running
2. Check if admin user was seeded
3. Verify credentials are correct
4. Check browser console for errors

### MongoDB connection issues?
1. Ensure MongoDB is running locally
2. Check connection string in .env
3. Verify database name is correct

---

## 📝 Environment Files

### Backend (.env)
```
PORT=10000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/shri-education
JWT_SECRET=super_secret_key_change_me
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5175
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:10000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_AGORA_APP_ID=your_agora_app_id
```

---

## 🎯 Next Steps

1. **Open Frontend**: http://localhost:5173/
2. **Login**: Use admin credentials
3. **Explore Dashboard**: Check out admin features
4. **Create Test Data**: Add courses, students, etc.
5. **Test Features**: Try enrollment, payments, etc.

---

## 📞 Support

If you encounter any issues:
1. Check the console logs in both frontend and backend
2. Verify all services are running
3. Check network connectivity
4. Review environment configuration

---

**System Status**: ✅ All Green
**Last Updated**: May 18, 2026
**Ready to Use**: YES
