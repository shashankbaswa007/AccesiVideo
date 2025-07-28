import React, { useState } from 'react';
import { Download, FileText, Video, Check } from 'lucide-react';
import { Video as VideoType, Caption, Language, ExportFormat } from '../types';

interface ExportOptionsProps {
  video: VideoType;
  captions: Caption[];
  language: Language;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({
  video,
  captions,
  language
}) => {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [exported, setExported] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const exportFormats: ExportFormat[] = [
    { type: 'srt', name: 'SubRip (.srt)', extension: 'srt' },
    { type: 'vtt', name: 'WebVTT (.vtt)', extension: 'vtt' },
    { type: 'txt', name: 'Plain Text (.txt)', extension: 'txt' }
  ];

  const generateSRT = (captions: Caption[]): string => {
    return captions.map((caption, index) => {
      const startTime = formatSRTTime(caption.startTime);
      const endTime = formatSRTTime(caption.endTime);
      return `${index + 1}\n${startTime} --> ${endTime}\n${caption.text}\n`;
    }).join('\n');
  };

  const generateVTT = (captions: Caption[]): string => {
    const content = captions.map(caption => {
      const startTime = formatVTTTime(caption.startTime);
      const endTime = formatVTTTime(caption.endTime);
      return `${startTime} --> ${endTime}\n${caption.text}`;
    }).join('\n\n');
    return `WEBVTT\n\n${content}`;
  };

  const generateTXT = (captions: Caption[]): string => {
    return captions.map(caption => caption.text).join('\n\n');
  };

  const formatSRTTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
  };

  const formatVTTTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExport = async (format: ExportFormat) => {
    if (captions.length === 0) return;

    setIsExporting(format.type);

    // Simulate export processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    let content = '';
    let mimeType = 'text/plain';

    switch (format.type) {
      case 'srt':
        content = generateSRT(captions);
        mimeType = 'application/x-subrip';
        break;
      case 'vtt':
        content = generateVTT(captions);
        mimeType = 'text/vtt';
        break;
      case 'txt':
        content = generateTXT(captions);
        mimeType = 'text/plain';
        break;
    }

    const filename = `${video.title}-${language.code}.${format.extension}`;
    downloadFile(content, filename, mimeType);

    setIsExporting(null);
    setExported(prev => [...prev, format.type]);

    // Remove exported state after 3 seconds
    setTimeout(() => {
      setExported(prev => prev.filter(type => type !== format.type));
    }, 3000);
  };

  const handleVideoExport = async () => {
    setIsExporting('video');
    
    // Simulate video export processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In a real implementation, this would trigger server-side video processing
    // to burn-in subtitles and return a download link
    alert(`Video export with ${language.name} subtitles would be processed server-side and a download link provided.`);
    
    setIsExporting(null);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Subtitle Export Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-white border border-slate-300 rounded-lg px-4 py-3 hover:border-slate-400 transition-colors"
        >
          <FileText className="w-5 h-5 text-slate-600" />
          <span className="font-medium text-slate-900">Export Subtitles</span>
          <Download className="w-4 h-4 text-slate-600" />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-slate-300 rounded-lg shadow-lg z-50 min-w-64">
          <div className="py-2">
            {exportFormats.map((format) => (
              <button
                key={format.type}
                onClick={() => {
                  handleExport(format);
                  setIsDropdownOpen(false);
                }}
                disabled={captions.length === 0 || isExporting === format.type}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-medium text-slate-700">{format.name}</span>
                <div className="flex items-center space-x-2">
                  {exported.includes(format.type) ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : isExporting === format.type ? (
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
        )}
      </div>

      {/* Video Export Button */}
      <button
        onClick={handleVideoExport}
        disabled={captions.length === 0 || isExporting === 'video'}
        className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Video className="w-5 h-5" />
        <span className="font-medium">
          {isExporting === 'video' ? 'Exporting...' : 'Export Video'}
        </span>
        {isExporting === 'video' && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
      </button>
    </div>
  );
};

export default ExportOptions;