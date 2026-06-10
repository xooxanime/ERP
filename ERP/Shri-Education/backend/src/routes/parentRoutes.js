import express from 'express';
import { protect, authorize } from '../middleware/auth.js';

import {
  getParentDashboard,
  getParentProgress,
  getParentAttendance,
  getParentCourses
} from '../controllers/parentController.js';

const router = express.Router();

// Parent only routes
router.use(protect);
router.use(authorize('parent'));

router.get('/dashboard', getParentDashboard);
router.get('/progress', getParentProgress);
router.get('/attendance', getParentAttendance);
router.get('/courses', getParentCourses);

export default router;