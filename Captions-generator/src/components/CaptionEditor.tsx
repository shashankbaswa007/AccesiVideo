import React, { useState } from 'react';
import { Edit2, Save, Clock, Type, Loader } from 'lucide-react';
import { Caption } from '../types';

interface CaptionEditorProps {
  captions: Caption[];
  currentTime: number;
  onCaptionUpdate: (caption: Caption) => void;
  isProcessing: boolean;
}

const CaptionEditor: React.FC<CaptionEditorProps> = ({
  captions,
  currentTime,
  onCaptionUpdate,
  isProcessing
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const startEdit = (caption: Caption) => {
    setEditingId(caption.id);
    setEditText(caption.text);
  };

  const saveEdit = () => {
    const caption = captions.find(c => c.id === editingId);
    if (caption && editText.trim()) {
      onCaptionUpdate({
        ...caption,
        text: editText.trim()
      });
      setEditingId(null);
      setEditText('');
    } else if (!editText.trim()) {
      alert('Caption text cannot be empty.');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toFixed(1);
    return `${minutes}:${seconds.padStart(4, '0')}`;
  };

  const isCurrentCaption = (caption: Caption) => {
    return currentTime >= caption.startTime && currentTime <= caption.endTime;
  };

  if (isProcessing) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Generating Captions
          </h3>
          <p className="text-slate-600">
            AI is analyzing your video and creating captions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Type className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Caption Editor
            </h3>
            <p className="text-sm text-slate-500">
              {captions.length} captions • Click to edit
            </p>
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {captions.length === 0 ? (
          <div className="p-6 text-center">
            <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No captions available yet</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {captions.map((caption) => (
              <div
                key={caption.id}
                className={`
                  p-4 rounded-lg border transition-all
                  ${isCurrentCaption(caption) 
                    ? 'border-blue-300 bg-blue-50 shadow-sm' 
                    : 'border-slate-200 hover:border-slate-300'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-sm text-slate-500">
                    {formatTime(caption.startTime)} - {formatTime(caption.endTime)}
                  </div>
                  {editingId !== caption.id && (
                    <button
                      onClick={() => startEdit(caption)}
                      className="p-1 hover:bg-slate-100 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-slate-400" />
                    </button>
                  )}
                </div>

                {editingId === caption.id ? (
                  <div>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      autoFocus
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1 text-sm text-slate-600 hover:text-slate-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveEdit}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center space-x-1"
                      >
                        <Save className="w-3 h-3" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-700 leading-relaxed">
                    {caption.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptionEditor;