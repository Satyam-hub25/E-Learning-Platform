// Question interface for Firestore
export interface Question {
  id?: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-based)
  points: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  createdAt?: Date;
}

// User interface for Firestore
export interface User {
  uid: string;
  points: number;
  badges: string[];
  level: number;
  totalQuestionsAnswered?: number;
  correctAnswers?: number;
  subjects?: {
    [subject: string]: {
      points: number;
      questionsAnswered: number;
      correctAnswers: number;
    };
  };
  lastActive?: Date;
  createdAt?: Date;
}

// Badge interface
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category?: 'milestone' | 'progress' | 'achievement' | 'elite';
  requirement?: {
    type: 'points' | 'questions' | 'streak' | 'subject';
    value: number;
    subject?: string;
  };
}

// API Response interfaces
export interface QuestionsResponse {
  success: boolean;
  message: string;
  data?: Question[];
  error?: string;
}

export interface AnswerCheckResponse {
  success: boolean;
  message: string;
  data?: {
    correct: boolean;
    points: number;
    totalPoints: number;
    newLevel?: number;
    newBadges?: string[];
    correctAnswer?: number;
    explanation?: string;
  };
  error?: string;
}

export interface UserStatsResponse {
  success: boolean;
  message: string;
  data?: User;
  error?: string;
}