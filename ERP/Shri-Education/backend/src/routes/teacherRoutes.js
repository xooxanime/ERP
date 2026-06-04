import express from 'express';
import {
  getTeacherDashboard,
  getTeacherCourses,
  getTeacherStudents,
  getStudentProgress,
  getTeacherBatches,
  getTeacherSchedule
} from '../controllers/teacherController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Protect all routes
router.use(protect);
router.use(authorize('teacher'));

// Dashboard
router.get('/dashboard', getTeacherDashboard);

// Courses
router.get('/courses', getTeacherCourses);

// Students
router.get('/students', getTeacherStudents);
router.get('/student/:studentId/progress', getStudentProgress);

// Batches
router.get('/batches', getTeacherBatches);

// Schedule
router.get('/schedule', getTeacherSchedule);

export default router;
