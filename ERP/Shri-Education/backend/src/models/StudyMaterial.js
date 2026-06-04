import mongoose from 'mongoose';

const studyMaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Notes', 'Practice Questions', 'Mock Tests', 'Previous Papers', 'Reference Books']
  },
  subject: {
    type: String,
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['PDF', 'DOC', 'PPT', 'ZIP'],
    default: 'PDF'
  },
  fileSize: {
    type: String
  },
  downloads: {
    type: Number,
    default: 0
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const StudyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);

export default StudyMaterial;
