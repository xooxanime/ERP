import User from '../models/User.js';
import Enrollment from '../models/Enrollment.js';
import Progress from '../models/Progress.js';

// @desc Get Parent Dashboard
// @route GET /api/parent/dashboard
// @access Private (Parent)
export const getParentDashboard = async (req, res) => {
  try {
    const studentId = req.user.parentInfo?.studentId;

    if (!studentId) {
      return res.status(404).json({
        status: 'error',
        message: 'No student linked to this parent account'
      });
    }

    const student = await User.findById(studentId);

    const enrollments = await Enrollment.find({
      studentId
    }).populate('courseId');

    const totalCourses = enrollments.length;

    const avgProgress =
      totalCourses > 0
        ? Math.round(
            enrollments.reduce((sum, e) => sum + e.progress, 0) /
              totalCourses
          )
        : 0;

    const completedCourses = enrollments.filter(
      e => e.status === 'completed'
    ).length;

    res.status(200).json({
      status: 'success',
      data: {
        student: {
          id: student._id,
          name: student.name,
          email: student.email
        },
        stats: {
          totalCourses,
          avgProgress,
          completedCourses
        },
        enrollments
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc Get Child Progress
// @route GET /api/parent/progress
// @access Private (Parent)
export const getParentProgress = async (req, res) => {
  try {
    const studentId = req.user.parentInfo?.studentId;

    const progress = await Progress.find({
      student: studentId
    }).populate('course');

    res.status(200).json({
      status: 'success',
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc Get Child Attendance
// @route GET /api/parent/attendance
// @access Private (Parent)
export const getParentAttendance = async (req, res) => {
  try {
    const studentId = req.user.parentInfo?.studentId;

    const enrollments = await Enrollment.find({
      studentId
    }).populate('courseId');

    const attendance = enrollments.map(enrollment => ({
      course: enrollment.courseId?.title,
      progress: enrollment.progress,
      status: enrollment.status
    }));

    res.status(200).json({
      status: 'success',
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc Get Parent Notifications
// @route GET /api/parent/notifications
// @access Private (Parent)
export const getParentNotifications = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: [
        {
          id: 1,
          title: 'New Assignment',
          message: 'Your child has received a new assignment.'
        },
        {
          id: 2,
          title: 'Course Progress',
          message: 'Progress updated in enrolled courses.'
        }
      ]
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }

};

// @desc Get Child Courses
// @route GET /api/parent/courses
// @access Private (Parent)
export const getParentCourses = async (req, res) => {
  try {
    const studentId = req.user.parentInfo?.studentId;

    if (!studentId) {
      return res.status(404).json({
        status: 'error',
        message: 'No student linked to this parent account'
      });
    }

    const enrollments = await Enrollment.find({
      studentId
    }).populate('courseId');

    const courses = enrollments.map(enrollment => ({
      enrollmentId: enrollment._id,
      progress: enrollment.progress,
      status: enrollment.status,
      course: enrollment.courseId
    }));

    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};