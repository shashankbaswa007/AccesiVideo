import React from 'react';
import { X, Video, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Video as VideoType } from '../types';

interface SidebarProps {
  videos: VideoType[];
  selectedVideo: VideoType | null;
  onVideoSelect: (video: VideoType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  videos,
  selectedVideo,
  onVideoSelect,
  isOpen,
  onClose
}) => {
  const getStatusIcon = (status: VideoType['status']) => {
    switch (status) {
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: VideoType['status']) => {
    switch (status) {
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Ready';
      case 'error':
        return 'Error';
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              onClose();
            }
          }}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Your Videos</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors lg:hidden"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {videos.length === 0 ? (
            <div className="p-6 text-center">
              <Video className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No videos uploaded yet</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => {
                    onVideoSelect(video);
                    onClose();
                  }}
                  className={`
                    w-full p-4 rounded-lg border text-left transition-all hover:shadow-md
                    ${selectedVideo?.id === video.id 
                      ? 'border-blue-300 bg-blue-50 shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-slate-900 truncate pr-2">
                      {video.title}
                    </h3>
                    {getStatusIcon(video.status)}
                  </div>
                  
                  <p className="text-sm text-slate-500 mb-2">
                    {video.filename}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className={`
                      px-2 py-1 rounded-full font-medium
                      ${video.status === 'completed' ? 'bg-green-100 text-green-700' :
                        video.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }
                    `}>
                      {getStatusText(video.status)}
                    </span>
                    
                    <span className="text-slate-400">
                      {video.uploadDate.toLocaleDateString()}
                    </span>
                  </div>

                  {video.status === 'completed' && (
                    <div className="mt-2 text-xs text-slate-500">
                      {Object.keys(video.captions).length} languages available
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;