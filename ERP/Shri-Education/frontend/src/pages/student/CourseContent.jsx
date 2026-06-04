import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { FiPlay, FiDownload, FiCheckCircle } from 'react-icons/fi';
import { studentAPI } from '../../services/api';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';

const CourseContent = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseContent();
  }, [id]);

  const fetchCourseContent = async () => {
    try {
      const response = await studentAPI.getCourseContent(id);
      setCourseData(response.data.data);
      // Set first video as default
      if (response.data.data.modules.length > 0 && response.data.data.modules[0].videos.length > 0) {
        setSelectedVideo(response.data.data.modules[0].videos[0]);
      }
    } catch (error) {
      console.error('Error fetching course content:', error);
      toast.error('Failed to load course content');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoComplete = async (videoId) => {
    try {
      await studentAPI.markVideoComplete(videoId, id);
      toast.success('Video marked as complete');
      fetchCourseContent(); // Refresh to update progress
    } catch (error) {
      console.error('Error marking video complete:', error);
    }
  };

  if (loading) return <Loading />;
  if (!courseData) return <div>Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {courseData.course.title}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all"
                style={{ width: `${courseData.progress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {courseData.progress}%
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="card">
              {selectedVideo ? (
                <>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                    <ReactPlayer
                      url={selectedVideo.url}
                      controls
                      width="100%"
                      height="100%"
                      onEnded={() => handleVideoComplete(selectedVideo._id)}
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedVideo.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{selectedVideo.duration}</span>
                    {courseData.completedVideos.includes(selectedVideo._id) && (
                      <span className="flex items-center space-x-1 text-green-500">
                        <FiCheckCircle />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600 dark:text-gray-400">Select a video to start learning</p>
                </div>
              )}
            </div>
          </div>

          {/* Course Modules */}
          <div className="lg:col-span-1">
            <div className="card max-h-[600px] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Course Content
              </h3>
              <div className="space-y-4">
                {courseData.modules.map((module, moduleIndex) => (
                  <div key={module._id}>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {moduleIndex + 1}. {module.title}
                    </h4>
                    <div className="space-y-2">
                      {module.videos.map((video) => (
                        <button
                          key={video._id}
                          onClick={() => setSelectedVideo(video)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            selectedVideo?._id === video._id
                              ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-600'
                              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`flex-shrink-0 ${
                              courseData.completedVideos.includes(video._id)
                                ? 'text-green-500'
                                : 'text-gray-400'
                            }`}>
                              {courseData.completedVideos.includes(video._id) ? (
                                <FiCheckCircle className="w-5 h-5" />
                              ) : (
                                <FiPlay className="w-5 h-5" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {video.title}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {video.duration}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Notes */}
                    {module.notes && module.notes.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {module.notes.map((note) => (
                          <a
                            key={note._id}
                            href={note.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 p-2 text-sm text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                          >
                            <FiDownload className="w-4 h-4" />
                            <span>{note.title}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
