import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  availableLanguages: string[];
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onLanguageChange,
  availableLanguages
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const availableLanguageOptions = languages.filter(
    lang => availableLanguages.includes(lang.code)
  );

  // Show all languages if no video is selected (for demo purposes)
  const displayLanguages = availableLanguageOptions.length > 0 ? availableLanguageOptions : languages.slice(0, 8);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 bg-white border border-slate-300 rounded-lg px-4 py-3 hover:border-slate-400 transition-colors min-w-48"
      >
        <Globe className="w-5 h-5 text-slate-600" />
        <div className="flex items-center space-x-2 flex-1">
          <span className="text-xl">{selectedLanguage.flag}</span>
          <span className="font-medium text-slate-900">{selectedLanguage.name}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-300 rounded-lg shadow-lg z-50">
          <div className="py-2">
            {displayLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  onLanguageChange(language);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 transition-colors
                  ${selectedLanguage.code === language.code ? 'bg-blue-50 text-blue-600' : 'text-slate-700'}
                `}
              >
                <span className="text-xl">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
                {selectedLanguage.code === language.code && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableLanguageOptions.length === 0 && availableLanguages.length > 0 && (
        <div className="mt-1 text-sm text-slate-500">
          No translations available yet
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;