import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import User from '../models/User.js';
import Module from '../models/Module.js';

// @desc    Get teacher dashboard
// @route   GET /api/teacher/dashboard
// @access  Private (Teacher)
export const getTeacherDashboard = async (req, res) => {
  try {
    const teacherId = req.user.id;

    // Get teacher's courses
    const courses = await Course.find({ instructor: teacherId });
    const courseIds = courses.map(c => c._id);

    // Get all enrollments for teacher's courses
    const enrollments = await Enrollment.find({ courseId: { $in: courseIds } })
      .populate('studentId', 'name email phone')
      .populate('courseId', 'title');

    // Get unique students
    const uniqueStudents = new Set(enrollments.map(e => e.studentId._id.toString()));

    // Calculate stats
    const stats = {
      totalStudents: uniqueStudents.size,
      activeBatches: courses.length,
      classesToday: 3, // Mock data - can be fetched from schedule
      pendingReviews: enrollments.filter(e => e.status === 'active').length
    };

    // Get batch performance data
    const batchPerformance = courses.map(course => ({
      batch: course.title,
      avgScore: Math.floor(Math.random() * 40 + 60), // Mock data
      attendance: Math.floor(Math.random() * 30 + 70) // Mock data
    }));

    // Get recent students
    const recentStudents = enrollments
      .sort((a, b) => new Date(b.enrollmentDate) - new Date(a.enrollmentDate))
      .slice(0, 5)
      .map(e => ({
        name: e.studentId.name,
        batch: e.courseId?.title || 'Unknown',
        attendance: Math.floor(Math.random() * 30 + 70) + '%',
        lastSeen: new Date(e.lastAccessedDate).toLocaleDateString()
      }));

    res.status(200).json({
      status: 'success',
      data: {
        stats,
        batchPerformance,
        recentStudents
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get teacher's courses
// @route   GET /api/teacher/courses
// @access  Private (Teacher)
export const getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id })
      .populate('modules');

    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: { courses }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get teacher's students
// @route   GET /api/teacher/students
// @access  Private (Teacher)
export const getTeacherStudents = async (req, res) => {
  try {
    const teacherId = req.user.id;

    // Get teacher's courses
    const courses = await Course.find({ instructor: teacherId });
    const courseIds = courses.map(c => c._id);

    // Get all enrollments for teacher's courses
    const enrollments = await Enrollment.find({ courseId: { $in: courseIds } })
      .populate('studentId', 'name email phone avatar')
      .populate('courseId', 'title');

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

// @desc    Get student progress
// @route   GET /api/teacher/student/:studentId/progress
// @access  Private (Teacher)
export const getStudentProgress = async (req, res) => {
  try {
    const { studentId } = req.params;
    const teacherId = req.user.id;

    // Verify teacher has access to this student
    const courses = await Course.find({ instructor: teacherId });
    const courseIds = courses.map(c => c._id);

    const enrollment = await Enrollment.findOne({
      studentId,
      courseId: { $in: courseIds }
    }).populate('courseId');

    if (!enrollment) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have access to this student'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        enrollment,
        progress: enrollment.progress,
        completedVideos: enrollment.completedVideos.length,
        status: enrollment.status
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get teacher's batches
// @route   GET /api/teacher/batches
// @access  Private (Teacher)
export const getTeacherBatches = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id });

    const batches = courses.map(course => ({
      id: course._id,
      name: course.title,
      category: course.category,
      students: Math.floor(Math.random() * 50 + 10), // Mock data
      status: 'active'
    }));

    res.status(200).json({
      status: 'success',
      results: batches.length,
      data: { batches }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get teacher's schedule
// @route   GET /api/teacher/schedule
// @access  Private (Teacher)
export const getTeacherSchedule = async (req, res) => {
  try {
    // Mock schedule data - can be extended with actual schedule model
    const schedule = [
      {
        time: '10:00 AM',
        title: 'Advanced Auditing',
        batch: 'CA Final Batch A',
        type: 'live'
      },
      {
        time: '2:00 PM',
        title: 'Corporate Law',
        batch: 'CA Inter Batch B',
        type: 'live'
      },
      {
        time: '4:30 PM',
        title: 'Doubt Session',
        batch: 'All Batches',
        type: 'live'
      }
    ];

    res.status(200).json({
      status: 'success',
      data: { schedule }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
