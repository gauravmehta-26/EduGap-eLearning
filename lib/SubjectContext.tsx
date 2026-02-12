'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { SubjectId, Subject, SubjectContextType } from './types';

// Subject metadata
export const subjects: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚛️',
    description: 'Study of matter, energy, and their interactions',
    color: '#3B82F6'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    description: 'Study of numbers, quantities, and shapes',
    color: '#8B5CF6'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    description: 'Study of matter and its properties',
    color: '#10B981'
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    description: 'Study of living organisms',
    color: '#F59E0B'
  }
];

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

// Valid subject IDs for validation
const validSubjects: SubjectId[] = ['physics', 'mathematics', 'chemistry', 'biology'];

export function SubjectProvider({ children }: { children: ReactNode }) {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);

  // Validate and set subject with error handling
  const setSelectedSubjectWithValidation = (subject: SubjectId | null) => {
    if (subject === null) {
      setSelectedSubject(null);
      return;
    }

    // Validate subject ID against allowed values
    if (!validSubjects.includes(subject)) {
      console.error(`Invalid subject ID: ${subject}. Clearing subject state.`);
      setSelectedSubject(null);
      return;
    }

    setSelectedSubject(subject);
  };

  const getSubjectInfo = (subjectId: SubjectId): Subject => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) {
      throw new Error(`Subject not found: ${subjectId}`);
    }
    return subject;
  };

  return (
    <SubjectContext.Provider value={{ 
      selectedSubject, 
      setSelectedSubject: setSelectedSubjectWithValidation,
      getSubjectInfo 
    }}>
      {children}
    </SubjectContext.Provider>
  );
}

export function useSubject() {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error('useSubject must be used within SubjectProvider');
  }
  return context;
}
