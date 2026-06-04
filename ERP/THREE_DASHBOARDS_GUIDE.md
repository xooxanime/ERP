# 🎯 Shri Education Platform - Three Dashboards Guide

## ✅ System Status
- **Backend**: Running on http://localhost:10000 ✅
- **Frontend**: Running on http://localhost:5173 ✅
- **Database**: MongoDB Connected ✅
- **All Users**: Created and Ready ✅

---

## 🔐 Login Credentials for Three Dashboards

### 1️⃣ ADMIN DASHBOARD
```
Email:    admin@shri.com
Password: Admin@123
Role:     ADMIN
```
**Access**: http://localhost:5173/admin/dashboard

**Admin Features**:
- 📊 Dashboard Analytics
- 📚 Course Management (Create, Edit, Delete)
- 👥 Student Management
- 👨‍🏫 Faculty Management
- 💳 Payment Management
- 📈 Progress Tracking
- 🎨 Hero Section Management
- 📄 Study Materials Management

---

### 2️⃣ TEACHER DASHBOARD
```
Email:    teacher@shri.com
Password: Teacher@123
Role:     TEACHER
```
**Access**: http://localhost:5173/teacher/dashboard

**Teacher Features**:
- 📊 Dashboard Overview
- 📚 My Courses
- 👥 Student List
- 📝 Course Content Management
- 📊 Student Progress Tracking
- 📄 Study Materials Upload
- 💬 Student Communication

---

### 3️⃣ STUDENT DASHBOARD
```
Email:    student@shri.com
Password: Student@123
Role:     STUDENT
```
**Access**: http://localhost:5173/student/dashboard

**Student Features**:
- 📊 Dashboard Overview
- 📚 Browse Courses
- ✅ Enroll in Courses
- 📖 View Course Content
- 📊 Track Progress
- 💳 Make Payments
- 📝 Download Study Materials
- 🎓 View Certificates

---

## 🚀 How to Test All Three Dashboards

### Step 1: Open Frontend
```
http://localhost:5173/
```

### Step 2: Login as Admin
1. Click "Login"
2. Enter:
   - Email: `admin@shri.com`
   - Password: `Admin@123`
3. Click "Sign In"
4. You'll be redirected to: `/admin/dashboard`

### Step 3: Logout and Login as Teacher
1. Click "Logout" (usually in top-right menu)
2. Click "Login"
3. Enter:
   - Email: `teacher@shri.com`
   - Password: `Teacher@123`
4. Click "Sign In"
5. You'll be redirected to: `/teacher/dashboard`

### Step 4: Logout and Login as Student
1. Click "Logout"
2. Click "Login"
3. Enter:
   - Email: `student@shri.com`
   - Password: `Student@123`
4. Click "Sign In"
5. You'll be redirected to: `/student/dashboard`

---

## 🔄 Role-Based Routing

The application automatically routes users to their respective dashboards based on their role:

```javascript
// From Login.jsx
if (role === 'admin') navigate('/admin/dashboard');
else if (role === 'teacher') navigate('/teacher/dashboard');
else navigate('/student/dashboard');
```

---

## 📋 Dashboard Routes

### Admin Routes
- `/admin/dashboard` - Main dashboard
- `/admin/courses` - Course management
- `/admin/students` - Student management
- `/admin/faculty` - Faculty management
- `/admin/enrollments` - Enrollment management
- `/admin/payments` - Payment management
- `/admin/analytics` - Analytics
- `/admin/hero-section` - Hero section management

### Teacher Routes
- `/teacher/dashboard` - Main dashboard
- `/teacher/courses` - My courses
- `/teacher/students` - Student list
- `/teacher/progress` - Student progress

### Student Routes
- `/student/dashboard` - Main dashboard
- `/student/courses` - Browse courses
- `/student/my-courses` - Enrolled courses
- `/student/course/:id` - Course content
- `/student/progress` - My progress

---

## 🧪 Testing Checklist

### Admin Testing
- [ ] Login with admin credentials
- [ ] Access admin dashboard
- [ ] Create a new course
- [ ] View all students
- [ ] Check analytics
- [ ] Manage payments
- [ ] Logout

### Teacher Testing
- [ ] Login with teacher credentials
- [ ] Access teacher dashboard
- [ ] View assigned courses
- [ ] Check student progress
- [ ] Upload study materials
- [ ] Logout

### Student Testing
- [ ] Login with student credentials
- [ ] Access student dashboard
- [ ] Browse available courses
- [ ] Enroll in a course
- [ ] View course content
- [ ] Track progress
- [ ] Logout

---

## 🔑 Key Features by Role

| Feature | Admin | Teacher | Student |
|---------|-------|---------|---------|
| Dashboard | ✅ | ✅ | ✅ |
| Create Courses | ✅ | ❌ | ❌ |
| Edit Courses | ✅ | ✅ | ❌ |
| View Students | ✅ | ✅ | ❌ |
| Enroll Courses | ❌ | ❌ | ✅ |
| View Progress | ✅ | ✅ | ✅ |
| Manage Payments | ✅ | ❌ | ✅ |
| Upload Materials | ✅ | ✅ | ❌ |
| Download Materials | ✅ | ✅ | ✅ |

---

## 🛠️ Troubleshooting

### Login Not Working?
1. Verify backend is running: `http://localhost:10000/api/health`
2. Check browser console for errors
3. Clear browser cache and try again
4. Verify credentials are correct

### Wrong Dashboard After Login?
1. Check user role in database
2. Verify routing logic in Login.jsx
3. Check if role is being returned correctly from API

### Can't Access Dashboard Routes?
1. Ensure you're logged in
2. Check PrivateRoute component
3. Verify token is stored in localStorage
4. Check browser console for errors

---

## 📱 API Endpoints Used

### Authentication
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/register` - Register new user

### Admin
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/students` - Get all students
- `GET /api/admin/enrollments` - Get enrollments

### Teacher
- `GET /api/teacher/dashboard` - Teacher dashboard data
- `GET /api/teacher/courses` - Get teacher's courses

### Student
- `GET /api/student/dashboard` - Student dashboard data
- `GET /api/student/my-courses` - Get enrolled courses
- `GET /api/student/course/:id/content` - Get course content

---

## 💡 Tips

1. **Quick Testing**: Use the same browser but different tabs for each role
2. **Clear Cache**: If you see old data, clear browser cache
3. **Check Console**: Always check browser console for errors
4. **Backend Logs**: Check backend terminal for API errors
5. **Database**: Use MongoDB Compass to verify user data

---

## ✨ Next Steps

1. ✅ Test all three dashboards
2. ✅ Create sample courses as admin
3. ✅ Enroll as student
4. ✅ Track progress
5. ✅ Test payments
6. ✅ Upload study materials

---

**Last Updated**: May 18, 2026
**Status**: ✅ All Systems Ready
**Ready to Test**: YES
