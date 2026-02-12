// Core type definitions for EduGap application

// Subject-related types
export type SubjectId = 'physics' | 'mathematics' | 'chemistry' | 'biology';

export interface Subject {
  id: SubjectId;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface SubjectContextType {
  selectedSubject: SubjectId | null;
  setSelectedSubject: (subject: SubjectId | null) => void;
  getSubjectInfo: (subjectId: SubjectId) => Subject;
}

// Quiz-related types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject?: SubjectId;
  topic?: string;
  difficulty?: string;
}

export interface QuizAnswer {
  questionId: string;
  selectedOption: number;
  correctAnswer?: number;
  topic?: string;
}

// Dashboard-related types
export interface WeakConcept {
  id: string | number;
  name: string;
  riskPercentage?: number;
  severity?: 'high' | 'medium' | 'low';
  subject: SubjectId;
}

export interface DashboardData {
  examFailureRisk: number;
  weakConcepts: WeakConcept[];
  subjectPerformance: {
    subject: string;
    score: number;
  }[];
}

// Remediation-related types
export interface RemediationContent {
  conceptId: string;
  conceptName: string;
  explanation: string;
  example: string;
  commonMistake: string;
  subject: SubjectId;
}
