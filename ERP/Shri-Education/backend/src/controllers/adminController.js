import Course from '../models/Course.js';
import Module from '../models/Module.js';
import Enrollment from '../models/Enrollment.js';
import Payment from '../models/Payment.js';
import User from '../models/User.js';
import HeroSection from '../models/HeroSection.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import { sendEmail } from '../utils/sendEmail.js';

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
export const getAdminDashboard = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    // Calculate total revenue
    const payments = await Payment.find({ status: 'success' });
    const totalRevenue = payments.reduce((acc, payment) => acc + payment.amount, 0);

    // Recent enrollments
    const recentEnrollments = await Enrollment.find()
      .populate('studentId', 'name email')
      .populate('courseId', 'title')
      .sort({ enrollmentDate: -1 })
      .limit(10);

    // Monthly revenue (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Payment.aggregate([
      {
        $match: {
          status: 'success',
          paymentDate: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$paymentDate' },
            month: { $month: '$paymentDate' }
          },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalStudents,
          totalCourses,
          totalEnrollments,
          totalRevenue
        },
        recentEnrollments,
        monthlyRevenue
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Create new course
// @route   POST /api/admin/courses
// @access  Private (Admin)
export const createCourse = async (req, res) => {
  try {
    const courseData = req.body;

    // Handle thumbnail upload if provided
    if (req.body.thumbnailBase64) {
      const uploadResult = await uploadToCloudinary(req.body.thumbnailBase64, 'courses/thumbnails');
      courseData.thumbnail = uploadResult;
      delete courseData.thumbnailBase64;
    }

    // Handle QR upload if provided
    if (req.body.paymentQrImageBase64) {
      const uploadResult = await uploadToCloudinary(req.body.paymentQrImageBase64, 'courses/qr');
      courseData.paymentQrImage = uploadResult;
      delete courseData.paymentQrImageBase64;
    }

    const course = await Course.create(courseData);

    res.status(201).json({
      status: 'success',
      message: 'Course created successfully',
      data: { course }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update course
// @route   PUT /api/admin/courses/:id
// @access  Private (Admin)
export const updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    const updateData = req.body;

    // Handle thumbnail update
    if (req.body.thumbnailBase64) {
      // Delete old thumbnail
      if (course.thumbnail.publicId) {
        await deleteFromCloudinary(course.thumbnail.publicId);
      }
      // Upload new thumbnail
      const uploadResult = await uploadToCloudinary(req.body.thumbnailBase64, 'courses/thumbnails');
      updateData.thumbnail = uploadResult;
      delete updateData.thumbnailBase64;
    }

    // Handle QR update
    if (req.body.paymentQrImageBase64) {
      // Delete old QR image
      if (course.paymentQrImage && course.paymentQrImage.publicId) {
        await deleteFromCloudinary(course.paymentQrImage.publicId);
      }
      // Upload new QR
      const uploadResult = await uploadToCloudinary(req.body.paymentQrImageBase64, 'courses/qr');
      updateData.paymentQrImage = uploadResult;
      delete updateData.paymentQrImageBase64;
    }

    course = await Course.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      message: 'Course updated successfully',
      data: { course }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete course
// @route   DELETE /api/admin/courses/:id
// @access  Private (Admin)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    // Delete thumbnail from cloudinary
    if (course.thumbnail.publicId) {
      await deleteFromCloudinary(course.thumbnail.publicId);
    }

    // Delete all modules and their videos
    const modules = await Module.find({ courseId: course._id });
    for (const module of modules) {
      // Delete videos from cloudinary
      for (const video of module.videos) {
        if (video.publicId) {
          await deleteFromCloudinary(video.publicId);
        }
      }
      // Delete notes from cloudinary
      for (const note of module.notes) {
        if (note.publicId) {
          await deleteFromCloudinary(note.publicId);
        }
      }
      await module.deleteOne();
    }

    await course.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get course with all modules and videos (Admin)
// @route   GET /api/admin/courses/:id/content
// @access  Private (Admin)
export const getCourseContent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    const modules = await Module.find({ courseId: course._id }).sort({ order: 1 });

    res.status(200).json({
      status: 'success',
      data: {
        course,
        modules
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Add module to course
// @route   POST /api/admin/courses/:id/modules
// @access  Private (Admin)
export const addModule = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    const moduleData = {
      ...req.body,
      courseId: req.params.id
    };

    const module = await Module.create(moduleData);

    res.status(201).json({
      status: 'success',
      message: 'Module added successfully',
      data: { module }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update module
// @route   PUT /api/admin/modules/:id
// @access  Private (Admin)
export const updateModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!module) {
      return res.status(404).json({
        status: 'error',
        message: 'Module not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Module updated successfully',
      data: { module }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete module
// @route   DELETE /api/admin/modules/:id
// @access  Private (Admin)
export const deleteModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      return res.status(404).json({
        status: 'error',
        message: 'Module not found'
      });
    }

    // Delete videos from cloudinary
    for (const video of module.videos) {
      if (video.publicId) {
        await deleteFromCloudinary(video.publicId);
      }
    }

    // Delete notes from cloudinary
    for (const note of module.notes) {
      if (note.publicId) {
        await deleteFromCloudinary(note.publicId);
      }
    }

    await module.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Module deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Add video to module
// @route   POST /api/admin/modules/:id/videos
// @access  Private (Admin)
export const addVideo = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      return res.status(404).json({
        status: 'error',
        message: 'Module not found'
      });
    }

    const videoData = req.body;

    // Handle video upload if base64 provided
    if (req.body.videoBase64) {
      const uploadResult = await uploadToCloudinary(req.body.videoBase64, 'courses/videos');
      videoData.url = uploadResult.url;
      videoData.publicId = uploadResult.publicId;
      delete videoData.videoBase64;
    }

    module.videos.push(videoData);
    await module.save();

    res.status(201).json({
      status: 'success',
      message: 'Video added successfully',
      data: { module }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Add note to module
// @route   POST /api/admin/modules/:id/notes
// @access  Private (Admin)
export const addNote = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      return res.status(404).json({
        status: 'error',
        message: 'Module not found'
      });
    }

    const noteData = req.body;

    // Handle PDF upload if base64 provided
    if (req.body.pdfBase64) {
      const uploadResult = await uploadToCloudinary(req.body.pdfBase64, 'courses/notes');
      noteData.url = uploadResult.url;
      noteData.publicId = uploadResult.publicId;
      delete noteData.pdfBase64;
    }

    module.notes.push(noteData);
    await module.save();

    res.status(201).json({
      status: 'success',
      message: 'Note added successfully',
      data: { module }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete video from module
// @route   DELETE /api/admin/modules/:moduleId/videos/:videoId
// @access  Private (Admin)
export const deleteVideo = async (req, res) => {
  try {
    const { moduleId, videoId } = req.params;
    const module = await Module.findById(moduleId);

    if (!module) {
      return res.status(404).json({ status: 'error', message: 'Module not found' });
    }

    const video = module.videos.id(videoId);
    if (!video) {
        return res.status(404).json({ status: 'error', message: 'Video not found' });
    }

    // Delete from Cloudinary
    if (video.publicId) {
      await deleteFromCloudinary(video.publicId);
    }

    video.deleteOne();
    await module.save();

    res.status(200).json({
      status: 'success',
      message: 'Video deleted successfully',
      data: { module }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Delete note from module
// @route   DELETE /api/admin/modules/:moduleId/notes/:noteId
// @access  Private (Admin)
export const deleteNote = async (req, res) => {
  try {
    const { moduleId, noteId } = req.params;
    const module = await Module.findById(moduleId);

    if (!module) {
      return res.status(404).json({ status: 'error', message: 'Module not found' });
    }

    const note = module.notes.id(noteId);
    if (!note) {
        return res.status(404).json({ status: 'error', message: 'Note not found' });
    }

    // Delete from Cloudinary
    if (note.publicId) {
      await deleteFromCloudinary(note.publicId);
    }

    note.deleteOne();
    await module.save();

    res.status(200).json({
      status: 'success',
      message: 'Note deleted successfully',
      data: { module }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Get all enrollments
// @route   GET /api/admin/enrollments
// @access  Private (Admin)
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('studentId', 'name email phone')
      .populate('courseId', 'title category price')
      .populate('paymentId')
      .sort({ enrollmentDate: -1 });

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

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private (Admin)
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: students.length,
      data: { students }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update hero section
// @route   PUT /api/admin/hero-section
// @access  Private (Admin)
export const updateHeroSection = async (req, res) => {
  try {
    let heroSection = await HeroSection.findOne();

    const updateData = req.body;

    // Handle banner image upload
    if (req.body.bannerImageBase64) {
      if (heroSection && heroSection.bannerImage.publicId) {
        await deleteFromCloudinary(heroSection.bannerImage.publicId);
      }
      const uploadResult = await uploadToCloudinary(req.body.bannerImageBase64, 'hero');
      updateData.bannerImage = uploadResult;
      delete updateData.bannerImageBase64;
    }

    if (heroSection) {
      heroSection = await HeroSection.findByIdAndUpdate(
        heroSection._id,
        updateData,
        { new: true, runValidators: true }
      );
    } else {
      heroSection = await HeroSection.create(updateData);
    }

    res.status(200).json({
      status: 'success',
      message: 'Hero section updated successfully',
      data: { heroSection }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get hero section
// @route   GET /api/admin/hero-section
// @access  Public
export const getHeroSection = async (req, res) => {
  try {
    let heroSection = await HeroSection.findOne({ isActive: true });

    if (!heroSection) {
      // Create default hero section
      heroSection = await HeroSection.create({});
    }

    res.status(200).json({
      status: 'success',
      data: { heroSection }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get all pending payments
// @route   GET /api/admin/payments/pending
// @access  Private (Admin)
export const getPendingPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ status: 'pending' })
      .populate('studentId', 'name email phone')
      .populate('courseId', 'title price')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: payments.length,
      data: { payments }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Verify pending payment
// @route   PUT /api/admin/payments/:id/verify
// @access  Private (Admin)
export const verifyPayment = async (req, res) => {
  try {
    const { status } = req.body; // 'success' or 'failed'
    
    if (!['success', 'failed'].includes(status)) {
        return res.status(400).json({ status: 'error', message: 'Invalid status' });
    }

    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        status: 'error',
        message: 'Payment not found'
      });
    }

    if (payment.status !== 'pending') {
      return res.status(400).json({
        status: 'error',
        message: 'Payment has already been processed'
      });
    }

    payment.status = status;
    payment.paymentDate = Date.now();
    await payment.save();

    if (status === 'success') {
      // Calculate expiry date (exactly 12 months from now)
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 12);

      // Create enrollment
      const enrollment = await Enrollment.create({
        studentId: payment.studentId,
        courseId: payment.courseId,
        paymentId: payment._id,
        status: 'active',
        expiryDate
      });

      // Update course enrolled students count
      await Course.findByIdAndUpdate(payment.courseId, {
        $inc: { enrolledStudents: 1 }
      });

      // Update user's enrolled courses
      await User.findByIdAndUpdate(payment.studentId, {
        $push: { enrolledCourses: payment.courseId }
      });

      // Send Email
      const course = await Course.findById(payment.courseId);
      const user = await User.findById(payment.studentId);
      
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Enrollment Successful! 🎉</h2>
          <p>Dear ${user.name},</p>
          <p>Your payment has been verified by the admin. You have successfully purchased the course.</p>
          <p>Your course access is valid for exactly 12 months (until ${expiryDate.toLocaleDateString()}).</p>
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0;">${course.title}</h3>
            <p style="margin: 5px 0;"><strong>Category:</strong> ${course.category}</p>
            <p style="margin: 5px 0;"><strong>Instructor:</strong> ${course.instructor}</p>
            <p style="margin: 5px 0;"><strong>Amount Paid:</strong> ₹${payment.amount}</p>
          </div>
          <p>You can now access the course content from your dashboard.</p>
          <a href="${process.env.FRONTEND_URL}/student/my-courses" 
             style="display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Go to My Courses
          </a>
          <p>Happy Learning!</p>
          <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
            If you have any questions, feel free to contact our support team.
          </p>
        </div>
      `;

      await sendEmail({
        to: user.email,
        subject: 'Course Enrollment Successful - Payment Verified',
        html: emailHtml
      });
    } else {
       const user = await User.findById(payment.studentId);
       const course = await Course.findById(payment.courseId);
       
       const emailHtml = `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
         <h2 style="color: #DC2626;">Payment Verification Failed</h2>
         <p>Dear ${user.name},</p>
         <p>Your manual UTR payment for the course <strong>${course.title}</strong> could not be verified.</p>
         <p>Please double-check your UTR number or contact our support team for assistance.</p>
       </div>
       `;
       await sendEmail({
        to: user.email,
        subject: 'Course Payment Verification Failed',
        html: emailHtml
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Payment marked as ${status} successfully`,
      data: { payment }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
