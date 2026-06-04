# Shri Education Platform - Login Credentials & System Status

## ✅ System Status
- **Backend Server**: Running on `http://localhost:10000`
- **Database**: MongoDB Connected (Local: 127.0.0.1:27017)
- **Node Environment**: Development
- **Status**: All systems operational

---

## 🔐 Admin Login Credentials

### Email
```
abhaypratapmishra5678@gmail.com
```

### Password
```
Abhay1230!@
```

### Role
```
admin
```

---

## 🧪 Login Test Result

**Endpoint**: `POST http://localhost:10000/api/auth/login`

**Request Body**:
```json
{
  "email": "abhaypratapmishra5678@gmail.com",
  "password": "Abhay1230!@"
}
```

**Response** (Success ✅):
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "6a0b0108d19b31327f133c9f",
      "name": "Admin User",
      "email": "abhaypratapmishra5678@gmail.com",
      "phone": "9999999999",
      "role": "admin",
      "avatar": "https://res.cloudinary.com/demo/image/upload/avatar-placeholder.png"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMGIwMTA4ZDE5YjMxMzI3ZjEzM2M5ZiIsImlhdCI6MTc3OTEwNjE0NCwiZXhwIjoxNzc5NzEwOTQ0fQ.rKT9cnMUvP4dGC5PwGJl5SCHxW4hel6PuKMj-04ETGg"
  }
}
```

---

## 📋 Authentication System Details

### User Model
- **Name**: Admin User
- **Email**: abhaypratapmishra5678@gmail.com
- **Phone**: 9999999999
- **Role**: admin
- **Status**: Active

### JWT Token
- **Algorithm**: HS256
- **Expiration**: 7 days
- **Secret**: Configured in `.env` as `JWT_SECRET`

### Password Security
- **Hashing**: bcryptjs (10 salt rounds)
- **Minimum Length**: 6 characters
- **Current Password**: Abhay1230!@

---

## 🚀 Backend Server Information

### Running Command
```bash
npm run dev
```

### Port
```
10000
```

### Environment
```
development
```

### Database Connection
```
mongodb://127.0.0.1:27017/shri-education
```

---

## 📝 Available API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password
- `PUT /api/auth/profile` - Update user profile

### Other Routes
- `GET /api/health` - Health check
- `/api/courses` - Course management
- `/api/student` - Student operations
- `/api/admin` - Admin operations
- `/api/payment` - Payment processing
- `/api/faculty` - Faculty management
- `/api/study-materials` - Study materials
- `/api/progress` - Progress tracking

---

## 🔑 How to Use the Token

Include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer <token>
```

Example:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMGIwMTA4ZDE5YjMxMzI3ZjEzM2M5ZiIsImlhdCI6MTc3OTEwNjE0NCwiZXhwIjoxNzc5NzEwOTQ0fQ.rKT9cnMUvP4dGC5PwGJl5SCHxW4hel6PuKMj-04ETGg
```

---

## 📱 Frontend Configuration

The frontend is configured to connect to:
```
http://localhost:10000
```

Make sure your frontend `.env` file has:
```
VITE_API_URL=http://localhost:10000
```

---

## ✨ Next Steps

1. **Start Frontend**: Run `npm run dev` in the `frontend` directory
2. **Login**: Use the credentials above to login
3. **Test APIs**: Use Postman or similar tools to test endpoints
4. **Create Test Users**: Register new student accounts for testing

---

**Generated**: May 18, 2026
**Status**: ✅ All systems operational
