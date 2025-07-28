import React from 'react';
import { Menu, Video, Accessibility } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  AccessiVideo
                </h1>
                <p className="text-sm text-slate-500 hidden sm:block">
                  Making videos accessible worldwide
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Accessibility className="w-4 h-4" />
            <span className="hidden sm:inline">Universal Access</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;