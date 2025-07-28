import { Video, Language } from '../types';

export const mockLanguages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
  { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
];

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Welcome Introduction',
    filename: 'welcome-intro.mp4',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: 30,
    uploadDate: new Date('2024-01-15'),
    status: 'completed',
    captions: {
      'en': [
        {
          id: '1',
          startTime: 0,
          endTime: 3,
          text: 'Welcome to our accessibility platform.',
          language: 'en'
        },
        {
          id: '2',
          startTime: 3,
          endTime: 6,
          text: 'We make video content accessible to everyone.',
          language: 'en'
        }
      ],
      'es': [
        {
          id: '1',
          startTime: 0,
          endTime: 3,
          text: 'Bienvenido a nuestra plataforma de accesibilidad.',
          language: 'es'
        },
        {
          id: '2',
          startTime: 3,
          endTime: 6,
          text: 'Hacemos que el contenido de video sea accesible para todos.',
          language: 'es'
        }
      ],
      'hi': [
        {
          id: '1',
          startTime: 0,
          endTime: 3,
          text: 'हमारे पहुंच प्लेटफॉर्म में आपका स्वागत है।',
          language: 'hi'
        },
        {
          id: '2',
          startTime: 3,
          endTime: 6,
          text: 'हम वीडियो सामग्री को सभी के लिए सुलभ बनाते हैं।',
          language: 'hi'
        }
      ],
      'te': [
        {
          id: '1',
          startTime: 0,
          endTime: 3,
          text: 'మా యాక్సెసిబిలిటీ ప్లాట్‌ఫారమ్‌కు స్వాగతం.',
          language: 'te'
        },
        {
          id: '2',
          startTime: 3,
          endTime: 6,
          text: 'మేము వీడియో కంటెంట్‌ను అందరికీ అందుబాటులో ఉంచుతాము.',
          language: 'te'
        }
      ],
      'ta': [
        {
          id: '1',
          startTime: 0,
          endTime: 3,
          text: 'எங்கள் அணுகல் தளத்திற்கு வரவேற்கிறோம்.',
          language: 'ta'
        },
        {
          id: '2',
          startTime: 3,
          endTime: 6,
          text: 'வீடியோ உள்ளடக்கத்தை அனைவருக்கும் அணுகக்கூடியதாக மாற்றுகிறோம்.',
          language: 'ta'
        }
      ],
      'bn': [
        {
          id: '1',
          startTime: 0,
          endTime: 3,
          text: 'আমাদের অ্যাক্সেসিবিলিটি প্ল্যাটফর্মে স্বাগতম।',
          language: 'bn'
        },
        {
          id: '2',
          startTime: 3,
          endTime: 6,
          text: 'আমরা ভিডিও কন্টেন্টকে সবার জন্য অ্যাক্সেসযোগ্য করে তুলি।',
          language: 'bn'
        }
      ],
      'fr': [
        {
          id: '1',
          startTime: 0,
          endTime: 3,
          text: 'Bienvenue sur notre plateforme d\'accessibilité.',
          language: 'fr'
        },
        {
          id: '2',
          startTime: 3,
          endTime: 6,
          text: 'Nous rendons le contenu vidéo accessible à tous.',
          language: 'fr'
        }
      ]
    }
  }
];