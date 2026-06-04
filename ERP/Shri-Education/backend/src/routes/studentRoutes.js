import express from 'express';
import {
  getStudentDashboard,
  getMyCourses,
  getCourseContent,
  markVideoComplete,
  checkEnrollmentStatus
} from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Protect all routes
router.use(protect);
router.use(authorize('student'));

router.get('/dashboard', getStudentDashboard);
router.get('/my-courses', getMyCourses);
router.get('/course/:id/content', getCourseContent);
router.post('/video/:videoId/complete', markVideoComplete);
router.get('/enrollment-status/:courseId', checkEnrollmentStatus);

export default router;
