import { useState } from 'react';
import { Briefcase, Baby, BookOpen, X } from 'lucide-react';
import axios from 'axios';

export default function RoleSelectionModal({ onRoleSelect, onClose, isOpen, email }) {
  const [selectedRole, setSelectedRole] = useState('student');
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  const [approvalData, setApprovalData] = useState({
    parentInfo: {
      studentName: '',
      studentEmail: '',
      relationship: 'guardian'
    },
    teacherInfo: {
      qualifications: '',
      experience: '',
      specialization: '',
      department: ''
    }
  });
  const [submitting, setSubmitting] = useState(false);

  const roles = [
    {
      id: 'student',
      name: 'Student',
      icon: BookOpen,
      description: 'Direct login access',
      color: 'blue'
    },
    {
      id: 'teacher',
      name: 'Teacher',
      icon: Briefcase,
      description: 'Request approval required',
      color: 'purple'
    },
    {
      id: 'parent',
      name: 'Parent',
      icon: Baby,
      description: 'Request approval required',
      color: 'green'
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    if (roleId === 'student') {
      onRoleSelect(roleId);
    } else {
      setShowApprovalForm(true);
    }
  };

  const handleApprovalSubmit = async () => {
    try {
      setSubmitting(true);
      
      const payload = {
        name: '', // Will be filled on backend
        email,
        phone: '', // Will be filled on backend
        password: '', // Will be filled on backend
        requestedRole: selectedRole,
        [selectedRole === 'teacher' ? 'teacherInfo' : 'parentInfo']: 
          selectedRole === 'teacher' ? approvalData.teacherInfo : approvalData.parentInfo
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/approvals/request`,
        payload
      );

      alert('Request submitted! Please wait for admin approval.');
      onClose();
    } catch (error) {
      console.error('Error submitting approval request:', error);
      alert(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    green: 'bg-green-50 border-green-200 hover:bg-green-100'
  };

  if (showApprovalForm) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {selectedRole === 'teacher' ? 'Teacher' : 'Parent'} Information
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {selectedRole === 'teacher' ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Qualifications</label>
                  <input
                    type="text"
                    placeholder="e.g., B.Tech, M.Tech"
                    value={approvalData.teacherInfo.qualifications}
                    onChange={(e) => setApprovalData({
                      ...approvalData,
                      teacherInfo: { ...approvalData.teacherInfo, qualifications: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Experience (in years)</label>
                  <input
                    type="text"
                    placeholder="e.g., 5 years"
                    value={approvalData.teacherInfo.experience}
                    onChange={(e) => setApprovalData({
                      ...approvalData,
                      teacherInfo: { ...approvalData.teacherInfo, experience: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Specialization</label>
                  <input
                    type="text"
                    placeholder="e.g., Mathematics, Physics"
                    value={approvalData.teacherInfo.specialization}
                    onChange={(e) => setApprovalData({
                      ...approvalData,
                      teacherInfo: { ...approvalData.teacherInfo, specialization: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <input
                    type="text"
                    placeholder="e.g., Science, Commerce"
                    value={approvalData.teacherInfo.department}
                    onChange={(e) => setApprovalData({
                      ...approvalData,
                      teacherInfo: { ...approvalData.teacherInfo, department: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Student Name</label>
                  <input
                    type="text"
                    placeholder="Your child's name"
                    value={approvalData.parentInfo.studentName}
                    onChange={(e) => setApprovalData({
                      ...approvalData,
                      parentInfo: { ...approvalData.parentInfo, studentName: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Student Email</label>
                  <input
                    type="email"
                    placeholder="Your child's email"
                    value={approvalData.parentInfo.studentEmail}
                    onChange={(e) => setApprovalData({
                      ...approvalData,
                      parentInfo: { ...approvalData.parentInfo, studentEmail: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Relationship</label>
                  <select
                    value={approvalData.parentInfo.relationship}
                    onChange={(e) => setApprovalData({
                      ...approvalData,
                      parentInfo: { ...approvalData.parentInfo, relationship: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="mother">Mother</option>
                    <option value="father">Father</option>
                    <option value="guardian">Guardian</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                ℹ️ Your request will be reviewed by the administrator. You'll receive an email notification once it's approved or rejected.
              </p>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3 justify-end">
            <button
              onClick={() => {
                setShowApprovalForm(false);
                setSelectedRole('student');
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Back
            </button>
            <button
              onClick={handleApprovalSubmit}
              disabled={submitting}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-8 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Select Your Role</h2>
            <p className="text-white/90">Choose how you want to access the platform</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map(role => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`p-6 rounded-lg border-2 transition transform hover:scale-105 ${colorClasses[role.color]}`}
              >
                <Icon className="w-8 h-8 mb-3" />
                <h3 className="font-semibold text-lg mb-1">{role.name}</h3>
                <p className="text-sm text-gray-600">{role.description}</p>
              </button>
            );
          })}
        </div>

        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
