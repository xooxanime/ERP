import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiFile, FiDownload } from 'react-icons/fi';
import { adminAPI } from '../../services/api';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/AdminLayout';
import Loading from '../../components/Loading';

const AdminStudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Notes',
    subject: '',
    fileUrl: '',
    fileType: 'PDF',
    fileSize: '',
    isPremium: false
  });

  const categories = ['Notes', 'Practice Questions', 'Mock Tests', 'Previous Papers', 'Reference Books'];
  const subjects = ['Accounting', 'Taxation', 'Auditing', 'Law', 'Costing', 'Financial Management'];
  const fileTypes = ['PDF', 'DOC', 'DOCX', 'PPT', 'PPTX', 'ZIP'];

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await adminAPI.getAllStudyMaterials();
      setMaterials(response.data.data.materials);
    } catch (error) {
      toast.error('Failed to fetch study materials');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingMaterial) {
        await adminAPI.updateStudyMaterial(editingMaterial._id, formData);
        toast.success('Study material updated successfully');
      } else {
        await adminAPI.createStudyMaterial(formData);
        toast.success('Study material added successfully');
      }

      setShowModal(false);
      resetForm();
      fetchMaterials();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (material) => {
    setEditingMaterial(material);
    setFormData({
      title: material.title,
      description: material.description,
      category: material.category,
      subject: material.subject,
      fileUrl: material.file?.url || '',
      fileType: material.fileType,
      fileSize: material.fileSize || '',
      isPremium: material.isPremium
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this study material?')) return;

    try {
      await adminAPI.deleteStudyMaterial(id);
      toast.success('Study material deleted successfully');
      fetchMaterials();
    } catch (error) {
      toast.error('Failed to delete study material');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Notes',
      subject: '',
      fileUrl: '',
      fileType: 'PDF',
      fileSize: '',
      isPremium: false
    });
    setEditingMaterial(null);
  };

  if (loading) return <Loading />;

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Study Materials Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage notes, practice questions, and mock tests
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="btn-primary flex items-center space-x-2"
          >
            <FiPlus />
            <span>Add Material</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="card">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Materials</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{materials.length}</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Notes</p>
            <p className="text-3xl font-bold text-blue-600">
              {materials.filter(m => m.category === 'Notes').length}
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Practice Questions</p>
            <p className="text-3xl font-bold text-green-600">
              {materials.filter(m => m.category === 'Practice Questions').length}
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Mock Tests</p>
            <p className="text-3xl font-bold text-purple-600">
              {materials.filter(m => m.category === 'Mock Tests').length}
            </p>
          </div>
        </div>

        {/* Materials Table */}
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Title
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Category
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Subject
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Downloads
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Premium
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <FiFile className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {material.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {material.description.substring(0, 50)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                      {material.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    {material.subject}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    {material.fileType}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    <div className="flex items-center space-x-2">
                      <FiDownload className="w-4 h-4 text-gray-500" />
                      <span>{material.downloads}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {material.isPremium ? (
                      <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs rounded-full">
                        Premium
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                        Free
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(material)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(material._id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {materials.length === 0 && (
            <div className="text-center py-12">
              <FiFile className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No study materials yet. Add your first material!
              </p>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {editingMaterial ? 'Edit Study Material' : 'Add Study Material'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="input-field"
                      placeholder="e.g., Accounting Fundamentals Notes"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="input-field"
                      rows="3"
                      placeholder="Brief description of the study material"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category *
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="input-field"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject *
                      </label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="input-field"
                      >
                        <option value="">Select Subject</option>
                        {subjects.map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        File Type *
                      </label>
                      <select
                        required
                        value={formData.fileType}
                        onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
                        className="input-field"
                      >
                        {fileTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        File Size
                      </label>
                      <input
                        type="text"
                        value={formData.fileSize}
                        onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                        className="input-field"
                        placeholder="e.g., 2.5 MB"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      File URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.fileUrl}
                      onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                      className="input-field"
                      placeholder="https://example.com/file.pdf"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Upload file to cloud storage (Cloudinary, Google Drive, etc.) and paste the URL here
                    </p>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPremium"
                      checked={formData.isPremium}
                      onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="isPremium" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Premium Content (Only for enrolled students)
                    </label>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button type="submit" className="flex-1 btn-primary">
                      {editingMaterial ? 'Update' : 'Add'} Material
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminStudyMaterials;
