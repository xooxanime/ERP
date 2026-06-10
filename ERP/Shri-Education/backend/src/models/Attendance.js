import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  liveClassId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LiveClass',
    required: true
  },

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },

  joinedAt: {
    type: Date,
    default: Date.now
  },

  leftAt: Date,

  durationMinutes: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: [
      'present',
      'absent'
    ],
    default: 'present'
  }
}, {
  timestamps: true
});

attendanceSchema.index({
  liveClassId: 1,
  studentId: 1
}, {
  unique: true
});

const Attendance = mongoose.model(
  'Attendance',
  attendanceSchema
);

export default Attendance;