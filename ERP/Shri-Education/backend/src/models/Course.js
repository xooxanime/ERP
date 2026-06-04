import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['CA Foundation', 'CA Intermediate', 'CA Final']
  },
  instructor: {
    type: String,
    required: [true, 'Please provide instructor name']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  thumbnail: {
    url: {
      type: String,
      required: true
    },
    publicId: String
  },
  paymentQrImage: {
    url: String,
    publicId: String
  },
  duration: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  language: {
    type: String,
    default: 'English'
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  features: [String],
  requirements: [String]
}, {
  timestamps: true
});

// Calculate final price
courseSchema.virtual('finalPrice').get(function() {
  return this.price - (this.price * this.discount / 100);
});

courseSchema.set('toJSON', { virtuals: true });
courseSchema.set('toObject', { virtuals: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
