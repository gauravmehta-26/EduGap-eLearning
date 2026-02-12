// API client functions for frontend integration

import { QuizAnswer, QuizQuestion, SubjectId } from './types';

export interface AnalyzeResponse {
  failureRisk: number;
  weakConcepts: string[];
  summary: string;
  correctAnswers: number;
  totalQuestions: number;
  recommendations?: string[];
  source?: string;
}

export interface RemediationResponse {
  concept: string;
  explanation: string;
  example?: string;
  commonMistake?: string;
  tip?: string;
  keyPoints?: string[];
  examples?: string[];
  studyResources?: Array<{
    title: string;
    type: string;
    description: string;
  }>;
  youtubeSearchQuery?: string;
  source?: string;
}

export interface SaveResultResponse {
  success: boolean;
  message: string;
  saved: boolean;
  id?: string;
}

export interface GenerateQuizResponse {
  questions: QuizQuestion[];
  source: string;
  subject: SubjectId;
}

/**
 * Generate AI quiz questions for a subject
 */
export async function generateQuiz(subject: SubjectId, numQuestions: number = 5): Promise<GenerateQuizResponse> {
  try {
    const response = await fetch('/api/generate-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject, numQuestions }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to generate quiz');
    }

    return response.json();
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
}

/**
 * Analyze quiz answers and get learning gaps
 */
export async function analyzeQuiz(answers: QuizAnswer[], subject?: string): Promise<AnalyzeResponse> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers, subject }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to analyze quiz');
    }

    return response.json();
  } catch (error) {
    console.error('Error analyzing quiz:', error);
    throw error;
  }
}

/**
 * Get remediation content for a specific concept
 */
export async function getRemediation(concept: string, subject?: string): Promise<RemediationResponse> {
  try {
    const response = await fetch('/api/remediate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ concept, subject }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to get remediation content');
    }

    return response.json();
  } catch (error) {
    console.error('Error getting remediation:', error);
    throw error;
  }
}

/**
 * Save quiz result to database (optional)
 */
export async function saveResult(
  email: string,
  failureRisk: number,
  weakConcepts: string[]
): Promise<SaveResultResponse> {
  try {
    const response = await fetch('/api/saveResult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, failureRisk, weakConcepts }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to save result');
    }

    return response.json();
  } catch (error) {
    console.error('Error saving result:', error);
    throw error;
  }
}

/**
 * Example usage in a component:
 * 
 * ```typescript
 * import { analyzeQuiz, getRemediation, saveResult } from '@/lib/api';
 * import { QuizAnswer } from '@/lib/types';
 * 
 * // After quiz completion
 * const answers: QuizAnswer[] = [
 *   { questionId: 'q1', selectedOption: 2 },
 *   { questionId: 'q2', selectedOption: 1 },
 * ];
 * const result = await analyzeQuiz(answers);
 * 
 * console.log(result.failureRisk); // 50
 * console.log(result.weakConcepts); // ["Electrostatics"]
 * 
 * // Get remediation for weak concept
 * const remediation = await getRemediation("Electrostatics");
 * console.log(remediation.explanation);
 * 
 * // Optionally save result
 * await saveResult("student@example.com", result.failureRisk, result.weakConcepts);
 * ```
 */
