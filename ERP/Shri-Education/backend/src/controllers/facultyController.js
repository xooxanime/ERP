import Faculty from '../models/Faculty.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

// @desc    Get all faculty members
// @route   GET /api/faculty
// @access  Public
export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find({ isActive: true }).sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      results: faculty.length,
      data: { faculty }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get single faculty member
// @route   GET /api/faculty/:id
// @access  Public
export const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    
    if (!faculty) {
      return res.status(404).json({
        status: 'error',
        message: 'Faculty member not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: { faculty }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Create faculty member (Admin only)
// @route   POST /api/admin/faculty
// @access  Private/Admin
export const createFaculty = async (req, res) => {
  try {
    const facultyData = req.body;

    // Handle image upload if provided
    if (req.body.imageBase64) {
      const uploadResult = await uploadToCloudinary(req.body.imageBase64, 'faculty');
      facultyData.image = uploadResult;
      delete facultyData.imageBase64;
    }

    const faculty = await Faculty.create(facultyData);
    
    res.status(201).json({
      status: 'success',
      message: 'Faculty member created successfully',
      data: { faculty }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update faculty member (Admin only)
// @route   PUT /api/admin/faculty/:id
// @access  Private/Admin
export const updateFaculty = async (req, res) => {
  try {
    let faculty = await Faculty.findById(req.params.id);
    
    if (!faculty) {
      return res.status(404).json({
        status: 'error',
        message: 'Faculty member not found'
      });
    }

    const updateData = req.body;

    // Handle image update
    if (req.body.imageBase64) {
      // Delete old image
      if (faculty.image && faculty.image.publicId) {
        await deleteFromCloudinary(faculty.image.publicId);
      }
      // Upload new image
      const uploadResult = await uploadToCloudinary(req.body.imageBase64, 'faculty');
      updateData.image = uploadResult;
      delete updateData.imageBase64;
    }
    
    faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      status: 'success',
      message: 'Faculty member updated successfully',
      data: { faculty }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete faculty member (Admin only)
// @route   DELETE /api/admin/faculty/:id
// @access  Private/Admin
export const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    
    if (!faculty) {
      return res.status(404).json({
        status: 'error',
        message: 'Faculty member not found'
      });
    }

    // Delete image from cloudinary
    if (faculty.image && faculty.image.publicId) {
      await deleteFromCloudinary(faculty.image.publicId);
    }
    
    await faculty.deleteOne();
    
    res.status(200).json({
      status: 'success',
      message: 'Faculty member deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
