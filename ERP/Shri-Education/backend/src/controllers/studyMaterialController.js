import StudyMaterial from '../models/StudyMaterial.js';

// @desc    Get all study materials
// @route   GET /api/study-materials
// @access  Public
export const getAllStudyMaterials = async (req, res) => {
  try {
    const { category, subject, course } = req.query;
    const filter = { isActive: true };
    
    if (category) filter.category = category;
    if (subject) filter.subject = subject;
    if (course) filter.course = course;
    
    const materials = await StudyMaterial.find(filter)
      .populate('course', 'title')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      results: materials.length,
      data: { materials }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get single study material
// @route   GET /api/study-materials/:id
// @access  Public
export const getStudyMaterialById = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id).populate('course', 'title');
    
    if (!material) {
      return res.status(404).json({
        status: 'error',
        message: 'Study material not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: { material }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Download study material
// @route   POST /api/study-materials/:id/download
// @access  Private
export const downloadStudyMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    
    if (!material) {
      return res.status(404).json({
        status: 'error',
        message: 'Study material not found'
      });
    }
    
    // Increment download count
    material.downloads += 1;
    await material.save();
    
    res.status(200).json({
      status: 'success',
      data: { 
        fileUrl: material.fileUrl,
        fileName: material.title
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Create study material (Admin only)
// @route   POST /api/admin/study-materials
// @access  Private/Admin
export const createStudyMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.create(req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Study material created successfully',
      data: { material }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update study material (Admin only)
// @route   PUT /api/admin/study-materials/:id
// @access  Private/Admin
export const updateStudyMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!material) {
      return res.status(404).json({
        status: 'error',
        message: 'Study material not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Study material updated successfully',
      data: { material }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete study material (Admin only)
// @route   DELETE /api/admin/study-materials/:id
// @access  Private/Admin
export const deleteStudyMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findByIdAndDelete(req.params.id);
    
    if (!material) {
      return res.status(404).json({
        status: 'error',
        message: 'Study material not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Study material deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
