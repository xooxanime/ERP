import express from 'express';
import {
  getAdminDashboard,
  createCourse,
  updateCourse,
  deleteCourse,
  addModule,
  updateModule,
  deleteModule,
  deleteVideo,
  deleteNote,
  addVideo,
  addNote,
  getCourseContent,
  getAllEnrollments,
  getAllStudents,
  updateHeroSection,
  getHeroSection,
  getPendingPayments,
  verifyPayment
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route for hero section (needed for homepage)
router.get('/hero-section', getHeroSection);

// Protect all other routes and authorize only admin
router.use(protect);
router.use(authorize('admin'));

// Dashboard
router.get('/dashboard', getAdminDashboard);

// Course management
router.post('/courses', createCourse);
router.get('/courses/:id/content', getCourseContent);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

// Module management
router.post('/courses/:id/modules', addModule);
router.put('/modules/:id', updateModule);
router.delete('/modules/:id', deleteModule);

// Video and notes
router.post('/modules/:id/videos', addVideo);
router.delete('/modules/:moduleId/videos/:videoId', deleteVideo);
router.post('/modules/:id/notes', addNote);
router.delete('/modules/:moduleId/notes/:noteId', deleteNote);

// Enrollments, students, and payments
router.get('/enrollments', getAllEnrollments);
router.get('/students', getAllStudents);
router.get('/payments/pending', getPendingPayments);
router.put('/payments/:id/verify', verifyPayment);

// Hero section update
router.put('/hero-section', updateHeroSection);

export default router;
