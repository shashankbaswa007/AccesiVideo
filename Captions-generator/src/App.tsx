import React, { useState, useEffect } from 'react';
import VideoUpload from './components/VideoUpload';
import VideoPlayer from './components/VideoPlayer';
import CaptionEditor from './components/CaptionEditor';
import LanguageSelector from './components/LanguageSelector';
import ExportOptions from './components/ExportOptions';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Video, Caption, Language } from './types';
import { mockVideos, mockLanguages } from './data/mockData';

function App() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(mockLanguages[0]);
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (selectedVideo) {
      // Load captions for selected video and language
      const videoCaptions = selectedVideo.captions[selectedLanguage.code] || [];
      setCaptions(videoCaptions);
    }
  }, [selectedVideo, selectedLanguage]);

  const handleVideoUpload = async (file: File) => {
    // Validate file size (limit to 100MB for demo)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      alert('File size too large. Please select a video under 100MB.');
      return;
    }

    setIsProcessing(true);
    
    // Simulate video processing
    const newVideo: Video = {
      id: Date.now().toString(),
      title: file.name.replace(/\.[^/.]+$/, ''),
      filename: file.name,
      url: URL.createObjectURL(file),
      duration: 0, // Will be set when video loads
      uploadDate: new Date(),
      status: 'processing',
      captions: {}
    };

    setVideos(prev => [newVideo, ...prev]);
    setSelectedVideo(newVideo);

    // Simulate ML processing delay
    setTimeout(() => {
      // Mock caption generation
      const mockCaptions: Caption[] = [
        {
          id: '1',
          startTime: 0,
          endTime: 3.5,
          text: 'Welcome to our video accessibility demonstration.',
          language: 'en'
        },
        {
          id: '2',
          startTime: 3.5,
          endTime: 7.2,
          text: 'This system automatically generates captions from speech.',
          language: 'en'
        },
        {
          id: '3',
          startTime: 7.2,
          endTime: 11.0,
          text: 'You can edit captions and translate them into multiple languages.',
          language: 'en'
        }
      ];

      // Mock translations
      const translations = {
        'es': mockCaptions.map(cap => ({
          ...cap,
          text: getTranslation(cap.text, 'es'),
          language: 'es'
        })),
        'hi': mockCaptions.map(cap => ({
          ...cap,
          text: getTranslation(cap.text, 'hi'),
          language: 'hi'
        })),
        'te': mockCaptions.map(cap => ({
          ...cap,
          text: getTranslation(cap.text, 'te'),
          language: 'te'
        })),
        'ta': mockCaptions.map(cap => ({
          ...cap,
          text: getTranslation(cap.text, 'ta'),
          language: 'ta'
        })),
        'bn': mockCaptions.map(cap => ({
          ...cap,
          text: getTranslation(cap.text, 'bn'),
          language: 'bn'
        })),
        'fr': mockCaptions.map(cap => ({
          ...cap,
          text: getTranslation(cap.text, 'fr'),
          language: 'fr'
        })),
        'de': mockCaptions.map(cap => ({
          ...cap,
          text: getTranslation(cap.text, 'de'),
          language: 'de'
        }))
      };

      const updatedVideo = {
        ...newVideo,
        status: 'completed' as const,
        captions: {
          'en': mockCaptions,
          ...translations
        }
      };

      setVideos(prev => prev.map(v => v.id === newVideo.id ? updatedVideo : v));
      setSelectedVideo(updatedVideo);
      setIsProcessing(false);
    }, 3000);
  };

  const handleCaptionUpdate = (updatedCaption: Caption) => {
    if (!selectedVideo) return;

    const updatedCaptions = captions.map(cap => 
      cap.id === updatedCaption.id ? updatedCaption : cap
    );
    setCaptions(updatedCaptions);

    // Update video captions
    const updatedVideo = {
      ...selectedVideo,
      captions: {
        ...selectedVideo.captions,
        [selectedLanguage.code]: updatedCaptions
      }
    };
    setVideos(prev => prev.map(v => v.id === selectedVideo.id ? updatedVideo : v));
    setSelectedVideo(updatedVideo);
  };

  const getCurrentCaption = () => {
    return captions.find(caption => 
      currentTime >= caption.startTime && currentTime <= caption.endTime
    );
  };

  const getTranslation = (text: string, language: string): string => {
    const translations: Record<string, Record<string, string>> = {
      'Welcome to our video accessibility demonstration.': {
        'es': 'Bienvenido a nuestra demostración de accesibilidad de video.',
        'hi': 'हमारे वीडियो पहुंच प्रदर्शन में आपका स्वागत है।',
        'te': 'మా వీడియో యాక్సెసిబిలిటీ ప్రదర్శనకు స్వాగతం.',
        'ta': 'எங்கள் வீடியோ அணுகல் விளக்கத்திற்கு வரவேற்கிறோம்.',
        'bn': 'আমাদের ভিডিও অ্যাক্সেসিবিলিটি প্রদর্শনে স্বাগতম।',
        'fr': 'Bienvenue à notre démonstration d\'accessibilité vidéo.',
        'de': 'Willkommen zu unserer Video-Zugänglichkeits-Demonstration.'
      },
      'This system automatically generates captions from speech.': {
        'es': 'Este sistema genera automáticamente subtítulos a partir del habla.',
        'hi': 'यह सिस्टम भाषण से स्वचालित रूप से कैप्शन उत्पन्न करता है।',
        'te': 'ఈ సిస్టమ్ స్పీచ్ నుండి స్వయంచాలకంగా క్యాప్షన్లను ఉత్పన్నం చేస్తుంది.',
        'ta': 'இந்த அமைப்பு பேச்சிலிருந்து தானாகவே தலைப்புகளை உருவாக்குகிறது.',
        'bn': 'এই সিস্টেম স্বয়ংক্রিয়ভাবে বক্তৃতা থেকে ক্যাপশন তৈরি করে।',
        'fr': 'Ce système génère automatiquement des sous-titres à partir de la parole.',
        'de': 'Dieses System generiert automatisch Untertitel aus Sprache.'
      },
      'You can edit captions and translate them into multiple languages.': {
        'es': 'Puedes editar subtítulos y traducirlos a múltiples idiomas.',
        'hi': 'आप कैप्शन संपादित कर सकते हैं और उन्हें कई भाषाओं में अनुवाद कर सकते हैं।',
        'te': 'మీరు క్యాప్షన్లను సవరించవచ్చు మరియు వాటిని అనేక భాషలలోకి అనువదించవచ్చు.',
        'ta': 'நீங்கள் தலைப்புகளைத் திருத்தலாம் மற்றும் அவற்றை பல மொழிகளில் மொழிபெயர்க்கலாம்.',
        'bn': 'আপনি ক্যাপশন সম্পাদনা করতে পারেন এবং সেগুলি একাধিক ভাষায় অনুবাদ করতে পারেন।',
        'fr': 'Vous pouvez modifier les sous-titres et les traduire en plusieurs langues.',
        'de': 'Sie können Untertitel bearbeiten und in mehrere Sprachen übersetzen.'
      }
    };

    return translations[text]?.[language] || text;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex">
        <Sidebar 
          videos={videos}
          selectedVideo={selectedVideo}
          onVideoSelect={setSelectedVideo}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 p-6 space-y-6">
          {!selectedVideo ? (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">
                  Video Accessibility Studio
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Upload videos to automatically generate captions and translate them into multiple languages. 
                  Create accessible content for global audiences.
                </p>
              </div>
              
              <VideoUpload 
                onUpload={handleVideoUpload}
                isProcessing={isProcessing}
              />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Video Player Section */}
                <div className="lg:col-span-2">
                  <VideoPlayer
                    video={selectedVideo}
                    currentCaption={getCurrentCaption()}
                    onTimeUpdate={setCurrentTime}
                  />
                  
                  {/* Language and Export Controls */}
                  <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <LanguageSelector
                      languages={mockLanguages}
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={setSelectedLanguage}
                      availableLanguages={Object.keys(selectedVideo.captions)}
                    />
                    
                    <ExportOptions
                      video={selectedVideo}
                      captions={captions}
                      language={selectedLanguage}
                    />
                  </div>
                </div>

                {/* Caption Editor Section */}
                <div className="lg:col-span-1">
                  <CaptionEditor
                    captions={captions}
                    currentTime={currentTime}
                    onCaptionUpdate={handleCaptionUpdate}
                    isProcessing={isProcessing}
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;