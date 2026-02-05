
export enum VerificationStatus {
  VERIFIED = 'Verified',
  PARTIALLY_TRUE = 'Partially True',
  UNVERIFIED = 'Unverified',
  FALSE = 'False'
}

export interface VerificationResult {
  id: string;
  timestamp: number;
  type: 'text' | 'image' | 'link' | 'video';
  content: string;
  status: VerificationStatus;
  score: number; // 0-100
  summary: string;
  explanation: string;
  biasScore: number; // 0-100 (high = biased)
  credibilityScore: number; // 0-100
  sources: { title: string; url: string }[];
  anomalies?: string[];
  isDeepfake?: boolean;
}

export interface EducationalModule {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'literacy' | 'tactics' | 'technology';
  image: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  description: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  type: 'text' | 'image';
  mediaUrl?: string;
}
