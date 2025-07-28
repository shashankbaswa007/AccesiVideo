export interface Video {
  id: string;
  title: string;
  filename: string;
  url: string;
  duration: number;
  uploadDate: Date;
  status: 'processing' | 'completed' | 'error';
  captions: Record<string, Caption[]>;
}

export interface Caption {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  language: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface ExportFormat {
  type: 'srt' | 'vtt' | 'txt';
  name: string;
  extension: string;
}