import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

// Course APIs
export const courseAPI = {
  getAll: (params) => api.get('/courses', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  getCategories: () => api.get('/courses/categories')
};

// Student APIs
export const studentAPI = {
  getDashboard: () => api.get('/student/dashboard'),
  getMyCourses: () => api.get('/student/my-courses'),
  getCourseContent: (id) => api.get(`/student/course/${id}/content`),
  markVideoComplete: (videoId, courseId) => api.post(`/student/video/${videoId}/complete`, { courseId }),
  checkEnrollment: (courseId) => api.get(`/student/enrollment-status/${courseId}`)
};

// Payment APIs
export const paymentAPI = {
  createManualPayment: (data) => api.post('/payment/manual-payment', data),
  getHistory: () => api.get('/payment/history')
};

// Admin APIs
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  
  // Courses
  createCourse: (data) => api.post('/admin/courses', data),
  getCourseContent: (id) => api.get(`/admin/courses/${id}/content`),
  updateCourse: (id, data) => api.put(`/admin/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/admin/courses/${id}`),
  
  // Modules
  addModule: (courseId, data) => api.post(`/admin/courses/${courseId}/modules`, data),
  updateModule: (id, data) => api.put(`/admin/modules/${id}`, data),
  deleteModule: (id) => api.delete(`/admin/modules/${id}`),
  
  // Videos and Notes
  addVideo: (moduleId, data) => api.post(`/admin/modules/${moduleId}/videos`, data),
  deleteVideo: (moduleId, videoId) => api.delete(`/admin/modules/${moduleId}/videos/${videoId}`),
  addNote: (moduleId, data) => api.post(`/admin/modules/${moduleId}/notes`, data),
  deleteNote: (moduleId, noteId) => api.delete(`/admin/modules/${moduleId}/notes/${noteId}`),
  
  // Enrollments and Students
  getEnrollments: () => api.get('/admin/enrollments'),
  getStudents: () => api.get('/admin/students'),
  
  // Hero Section
  getHeroSection: () => api.get('/admin/hero-section'),
  updateHeroSection: (data) => api.put('/admin/hero-section', data),
  
  // Faculty
  getAllFaculty: () => api.get('/faculty'),
  createFaculty: (data) => api.post('/faculty', data),
  updateFaculty: (id, data) => api.put(`/faculty/${id}`, data),
  deleteFaculty: (id) => api.delete(`/faculty/${id}`),
  
  // Study Materials
  getAllStudyMaterials: () => api.get('/study-materials'),
  createStudyMaterial: (data) => api.post('/study-materials', data),
  updateStudyMaterial: (id, data) => api.put(`/study-materials/${id}`, data),
  deleteStudyMaterial: (id) => api.delete(`/study-materials/${id}`),
  
  // Payments
  getPendingPayments: () => api.get('/admin/payments/pending'),
  verifyPayment: (id, data) => api.put(`/admin/payments/${id}/verify`, data)
};

// Faculty APIs
export const facultyAPI = {
  getAll: () => api.get('/faculty')
};

// Study Material APIs
export const studyMaterialAPI = {
  getAll: (params) => api.get('/study-materials', { params }),
  download: (id) => api.post(`/study-materials/${id}/download`)
};

// Progress APIs
export const progressAPI = {
  getMyProgress: () => api.get('/progress'),
  getCourseProgress: (courseId) => api.get(`/progress/${courseId}`)
};

export default api;
