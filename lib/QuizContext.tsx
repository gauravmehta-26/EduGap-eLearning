'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnalyzeResponse } from './api';

interface QuizContextType {
  quizResult: AnalyzeResponse | null;
  setQuizResult: (result: AnalyzeResponse | null) => void;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizResult, setQuizResult] = useState<AnalyzeResponse | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  return (
    <QuizContext.Provider value={{ quizResult, setQuizResult, userEmail, setUserEmail }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
