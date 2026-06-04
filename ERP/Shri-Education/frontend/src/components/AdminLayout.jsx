import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          style={{ top: '80px' }} // Start below navbar
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed below the Navbar (top-20 = 80px navbar height) */}
      <div
        className={`fixed top-20 bottom-0 left-0 z-40 w-64 overflow-y-auto transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content — offset by sidebar width on desktop */}
      <div className="lg:ml-64 flex flex-col">
        {/* Mobile Header — sticky just below the Navbar */}
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 py-3 flex items-center justify-between sticky top-20 z-20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            Admin Panel
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Page Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
