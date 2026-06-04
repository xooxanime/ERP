import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import Module from '../models/Module.js';
import User from '../models/User.js';
import Payment from '../models/Payment.js';

// @desc    Get student dashboard
// @route   GET /api/student/dashboard
// @access  Private (Student)
export const getStudentDashboard = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.user.id })
      .populate('courseId', 'title thumbnail instructor category')
      .sort({ enrollmentDate: -1 });

    const stats = {
      totalEnrolled: enrollments.length,
      inProgress: enrollments.filter(e => e.status === 'active' && e.progress < 100).length,
      completed: enrollments.filter(e => e.status === 'completed' || e.progress === 100).length
    };

    res.status(200).json({
      status: 'success',
      data: {
        stats,
        recentCourses: enrollments.slice(0, 4)
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get enrolled courses
// @route   GET /api/student/my-courses
// @access  Private (Student)
export const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.user.id })
      .populate('courseId')
      .sort({ lastAccessedDate: -1 });

    res.status(200).json({
      status: 'success',
      results: enrollments.length,
      data: { enrollments }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get course content
// @route   GET /api/student/course/:id/content
// @access  Private (Student)
export const getCourseContent = async (req, res) => {
  try {
    // Check if student is enrolled
    const enrollment = await Enrollment.findOne({
      studentId: req.user.id,
      courseId: req.params.id
    });

    if (!enrollment) {
      return res.status(403).json({
        status: 'error',
        message: 'You are not enrolled in this course'
      });
    }

    // Get course details
    const course = await Course.findById(req.params.id);

    // Get all modules with videos
    const modules = await Module.find({ courseId: req.params.id, isPublished: true })
      .sort({ order: 1 });

    // Update last accessed date
    enrollment.lastAccessedDate = Date.now();
    await enrollment.save();

    res.status(200).json({
      status: 'success',
      data: {
        course,
        modules,
        progress: enrollment.progress,
        completedVideos: enrollment.completedVideos
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Mark video as completed
// @route   POST /api/student/video/:videoId/complete
// @access  Private (Student)
export const markVideoComplete = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { videoId } = req.params;

    const enrollment = await Enrollment.findOne({
      studentId: req.user.id,
      courseId
    });

    if (!enrollment) {
      return res.status(403).json({
        status: 'error',
        message: 'You are not enrolled in this course'
      });
    }

    // Add video to completed list if not already there
    if (!enrollment.completedVideos.includes(videoId)) {
      enrollment.completedVideos.push(videoId);

      // Calculate progress
      const modules = await Module.find({ courseId });
      const totalVideos = modules.reduce((acc, module) => acc + module.videos.length, 0);
      enrollment.progress = Math.round((enrollment.completedVideos.length / totalVideos) * 100);

      // Check if course is completed
      if (enrollment.progress === 100) {
        enrollment.status = 'completed';
      }

      await enrollment.save();
    }

    res.status(200).json({
      status: 'success',
      data: {
        progress: enrollment.progress,
        completedVideos: enrollment.completedVideos
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Check enrollment status
// @route   GET /api/student/enrollment-status/:courseId
// @access  Private (Student)
export const checkEnrollmentStatus = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      studentId: req.user.id,
      courseId: req.params.courseId
    });

    if (enrollment) {
        return res.status(200).json({
            status: 'success',
            data: {
              isEnrolled: true,
              enrollment
            }
        });
    }

    // Check for pending payment
    const pendingPayment = await Payment.findOne({
        studentId: req.user.id,
        courseId: req.params.courseId,
        status: 'pending'
    });

    res.status(200).json({
      status: 'success',
      data: {
        isEnrolled: false,
        hasPendingPayment: !!pendingPayment
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
