import React, { useRef, useState } from 'react';
import { Upload, Video, FileText, Zap } from 'lucide-react';

interface VideoUploadProps {
  onUpload: (file: File) => void;
  isProcessing: boolean;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload, isProcessing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (videoFile) {
      onUpload(videoFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onUpload(file);
    } else if (file) {
      alert('Please select a valid video file.');
    }
  };

  if (isProcessing) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Zap className="w-8 h-8 text-blue-600 animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          Processing Your Video
        </h3>
        <p className="text-slate-600 mb-6">
          We're analyzing the audio and generating captions...
        </p>
        <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
          <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
        <p className="text-sm text-slate-500">
          This usually takes 1-3 minutes depending on video length
        </p>
      </div>
    );
  }

  return (
    <div
      className={`
        relative bg-white rounded-2xl shadow-xl p-8 border-2 border-dashed transition-all
        ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-slate-300 hover:border-slate-400'}
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileInput}
        className="hidden"
      />

      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Upload className="w-10 h-10 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          Upload Your Video
        </h3>
        
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          Drag and drop your video file here, or click to browse. 
          We'll automatically generate captions and translations.
        </p>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Choose Video File
        </button>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Video className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Auto Transcription</h4>
            <p className="text-sm text-slate-600">
              AI-powered speech recognition generates accurate captions
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Multi-Language</h4>
            <p className="text-sm text-slate-600">
              Instant translation into 15+ languages including Hindi, Telugu, Tamil, Bengali, and more
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Fast Processing</h4>
            <p className="text-sm text-slate-600">
              Quick turnaround with professional-grade accuracy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;