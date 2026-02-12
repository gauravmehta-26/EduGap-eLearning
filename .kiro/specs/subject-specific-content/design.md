# Design Document: Subject-Specific Content

## Overview

This design implements subject-specific quiz questions and remediation content for the EduGap application. The solution uses React Context to persist subject selection across pages and reorganizes mock data into subject-keyed structures. The implementation ensures that users receive questions, weak concepts, and remediation content specific to their selected subject (Physics, Mathematics, Chemistry, or Biology).

## Architecture

### State Management Approach

The design uses React Context API to manage subject selection state across the application. This approach:
- Provides global access to subject context without prop drilling
- Persists subject selection throughout the user session
- Enables easy validation and redirection logic
- Integrates seamlessly with existing QuizContext

### Data Structure Transformation

Current structure (flat):
```typescript
quizQuestions: QuizQuestion[]
remediationContent: Record<string, RemediationContent>
```

New structure (subject-keyed):
```typescript
quizQuestionsBySubject: Record<SubjectId, QuizQuestion[]>
weakConceptsBySubject: Record<SubjectId, WeakConcept[]>
remediationContentBySubject: Record<SubjectId, Record<string, RemediationContent>>
```

## Components and Interfaces

### Type Definitions

```typescript
// lib/types.ts

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

// Existing types remain unchanged
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: SubjectId; // Add subject field
}

export interface WeakConcept {
  id: string;
  name: string;
  riskPercentage: number;
  subject: SubjectId; // Add subject field
}

export interface RemediationContent {
  conceptId: string;
  conceptName: string;
  explanation: string;
  example: string;
  commonMistake: string;
  subject: SubjectId; // Add subject field
}
```

### Subject Context Provider

```typescript
// lib/SubjectContext.tsx

import { createContext, useContext, useState, ReactNode } from 'react';

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export function SubjectProvider({ children }: { children: ReactNode }) {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);

  const getSubjectInfo = (subjectId: SubjectId): Subject => {
    // Return subject metadata from subjects array
    return subjects.find(s => s.id === subjectId)!;
  };

  return (
    <SubjectContext.Provider value={{ 
      selectedSubject, 
      setSelectedSubject,
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
```

### Updated Mock Data Structure

```typescript
// lib/mockData.ts

export const quizQuestionsBySubject: Record<SubjectId, QuizQuestion[]> = {
  physics: [
    {
      id: 'physics_q1',
      subject: 'physics',
      question: 'What is the formula for electric force between two charges?',
      options: ['F = ma', 'F = kq₁q₂/r²', 'F = GMm/r²', 'F = qE'],
      correctAnswer: 1
    },
    // ... 4 more physics questions
  ],
  mathematics: [
    {
      id: 'math_q1',
      subject: 'mathematics',
      question: 'What is the derivative of x²?',
      options: ['x', '2x', 'x²', '2'],
      correctAnswer: 1
    },
    // ... 4 more math questions
  ],
  chemistry: [
    {
      id: 'chem_q1',
      subject: 'chemistry',
      question: 'What is the pH of a neutral solution?',
      options: ['0', '7', '14', '1'],
      correctAnswer: 1
    },
    // ... 4 more chemistry questions
  ],
  biology: [
    {
      id: 'bio_q1',
      subject: 'biology',
      question: 'What is the powerhouse of the cell?',
      options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'],
      correctAnswer: 2
    },
    // ... 4 more biology questions
  ]
};

export const weakConceptsBySubject: Record<SubjectId, WeakConcept[]> = {
  physics: [
    { id: 'electrostatics', name: 'Electrostatics', riskPercentage: 85, subject: 'physics' },
    { id: 'mechanics', name: 'Mechanics', riskPercentage: 72, subject: 'physics' },
    { id: 'thermodynamics', name: 'Thermodynamics', riskPercentage: 65, subject: 'physics' }
  ],
  mathematics: [
    { id: 'calculus', name: 'Differential Calculus', riskPercentage: 78, subject: 'mathematics' },
    { id: 'trigonometry', name: 'Trigonometry', riskPercentage: 70, subject: 'mathematics' },
    { id: 'algebra', name: 'Algebra', riskPercentage: 62, subject: 'mathematics' }
  ],
  chemistry: [
    { id: 'organic', name: 'Organic Chemistry', riskPercentage: 80, subject: 'chemistry' },
    { id: 'acids-bases', name: 'Acids and Bases', riskPercentage: 68, subject: 'chemistry' },
    { id: 'stoichiometry', name: 'Stoichiometry', riskPercentage: 60, subject: 'chemistry' }
  ],
  biology: [
    { id: 'genetics', name: 'Genetics', riskPercentage: 75, subject: 'biology' },
    { id: 'cell-biology', name: 'Cell Biology', riskPercentage: 67, subject: 'biology' },
    { id: 'ecology', name: 'Ecology', riskPercentage: 58, subject: 'biology' }
  ]
};

export const remediationContentBySubject: Record<SubjectId, Record<string, RemediationContent>> = {
  physics: {
    electrostatics: {
      conceptId: 'electrostatics',
      conceptName: 'Electrostatics',
      subject: 'physics',
      explanation: 'Electrostatics is the study of electric charges at rest...',
      example: 'Consider two charges: q₁ = +5μC and q₂ = -3μC...',
      commonMistake: 'Students often forget that like charges repel...'
    },
    // ... more physics concepts
  },
  mathematics: {
    calculus: {
      conceptId: 'calculus',
      conceptName: 'Differential Calculus',
      subject: 'mathematics',
      explanation: 'Differential calculus focuses on rates of change...',
      example: 'Find the derivative of f(x) = x²...',
      commonMistake: 'Students often forget to reduce the exponent by 1...'
    },
    // ... more math concepts
  },
  chemistry: {
    organic: {
      conceptId: 'organic',
      conceptName: 'Organic Chemistry',
      subject: 'chemistry',
      explanation: 'Organic chemistry studies carbon-containing compounds...',
      example: 'Consider the structure of methane (CH₄)...',
      commonMistake: 'Students often confuse alkanes with alkenes...'
    },
    // ... more chemistry concepts
  },
  biology: {
    genetics: {
      conceptId: 'genetics',
      conceptName: 'Genetics',
      subject: 'biology',
      explanation: 'Genetics is the study of heredity and variation...',
      example: 'In a Punnett square for Aa × Aa...',
      commonMistake: 'Students often confuse genotype with phenotype...'
    },
    // ... more biology concepts
  }
};
```

## Data Models

### Subject Selection Flow

```
Profile Page:
  User selects subject → setSelectedSubject(subjectId) → Navigate to /quiz

Quiz Page:
  useEffect: Check selectedSubject
    - If null → redirect to /profile
    - If valid → load quizQuestionsBySubject[selectedSubject]
  
Dashboard Page:
  useEffect: Check selectedSubject
    - If null → redirect to /profile
    - If valid → load weakConceptsBySubject[selectedSubject]

Remediation Page:
  useEffect: Check selectedSubject and conceptId
    - If selectedSubject null → redirect to /profile
    - If conceptId invalid → show error
    - If valid → load remediationContentBySubject[selectedSubject][conceptId]
```

### Page Component Updates

#### Profile Page Updates

```typescript
// app/profile/page.tsx

const { setSelectedSubject } = useSubject();

const handleStartQuiz = () => {
  if (selectedSubject) {
    setSelectedSubject(selectedSubject as SubjectId);
    router.push('/quiz');
  }
};
```

#### Quiz Page Updates

```typescript
// app/quiz/page.tsx

const { selectedSubject } = useSubject();
const router = useRouter();

useEffect(() => {
  if (!selectedSubject) {
    router.push('/profile');
  }
}, [selectedSubject, router]);

const questions = selectedSubject 
  ? quizQuestionsBySubject[selectedSubject] 
  : [];
```

#### Dashboard Page Updates

```typescript
// app/dashboard/page.tsx

const { selectedSubject, getSubjectInfo } = useSubject();
const router = useRouter();

useEffect(() => {
  if (!selectedSubject) {
    router.push('/profile');
  }
}, [selectedSubject, router]);

const weakConcepts = selectedSubject 
  ? weakConceptsBySubject[selectedSubject] 
  : [];

const subjectInfo = selectedSubject 
  ? getSubjectInfo(selectedSubject) 
  : null;
```

#### Remediation Page Updates

```typescript
// app/remediation/page.tsx

const { selectedSubject, getSubjectInfo } = useSubject();
const conceptId = searchParams.get('concept');

useEffect(() => {
  if (!selectedSubject) {
    router.push('/profile');
    return;
  }
  
  if (!conceptId || !remediationContentBySubject[selectedSubject]?.[conceptId]) {
    setError(true);
  } else {
    setContent(remediationContentBySubject[selectedSubject][conceptId]);
  }
}, [selectedSubject, conceptId]);
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Subject Selection Storage

*For any* valid subject selection (Physics, Mathematics, Chemistry, Biology), when a user selects that subject on the profile page, the selected subject should be stored in application state and retrievable.

**Validates: Requirements 1.1**

### Property 2: Subject State Persistence

*For any* valid subject stored in state, when a user navigates to any page (quiz, dashboard, remediation), the selected subject should remain in application state and be retrievable.

**Validates: Requirements 1.2, 1.3, 1.4**

### Property 3: Missing Subject Redirection

*For any* page that requires subject context (quiz, dashboard, remediation), when no subject is selected in state, the system should redirect to the profile page.

**Validates: Requirements 1.5, 6.1, 6.5**

### Property 4: Subject-Specific Quiz Questions

*For any* selected subject, when displaying quiz questions, all questions shown should have a subject field matching the selected subject.

**Validates: Requirements 2.2, 2.4, 2.5**

### Property 5: Subject Validation

*For any* subject value provided to the system, the system should validate that it is one of the supported subjects (physics, mathematics, chemistry, biology).

**Validates: Requirements 6.4**

### Property 6: Subject-Specific Weak Concepts

*For any* selected subject, when displaying the dashboard, all weak concepts shown should have a subject field matching the selected subject.

**Validates: Requirements 3.2**

### Property 7: Subject-Specific Remediation Content

*For any* selected subject and valid concept ID, when displaying remediation content, the content should have a subject field matching the selected subject and a concept ID matching the requested concept.

**Validates: Requirements 4.2, 4.3**



## Error Handling

### Missing Subject Context

**Scenario**: User attempts to access quiz, dashboard, or remediation without selecting a subject

**Handling**:
- Check for `selectedSubject` in `useEffect` on page mount
- If null, redirect to `/profile` using `router.push()`
- Display loading state during redirect to prevent flash of content

**Implementation**:
```typescript
useEffect(() => {
  if (!selectedSubject) {
    router.push('/profile');
  }
}, [selectedSubject, router]);
```

### Invalid Subject ID

**Scenario**: Subject ID in state is not one of the supported subjects

**Handling**:
- Validate subject ID against `SubjectId` type
- If invalid, clear subject state and redirect to `/profile`
- Log error for debugging

**Implementation**:
```typescript
const validSubjects: SubjectId[] = ['physics', 'mathematics', 'chemistry', 'biology'];

if (selectedSubject && !validSubjects.includes(selectedSubject)) {
  console.error('Invalid subject ID:', selectedSubject);
  setSelectedSubject(null);
  router.push('/profile');
}
```

### Missing Concept ID

**Scenario**: User accesses remediation page without concept ID parameter

**Handling**:
- Check for `concept` query parameter
- If missing, display error card with message
- Provide button to return to dashboard

**Implementation**:
```typescript
const conceptId = searchParams.get('concept');

if (!conceptId) {
  return <ErrorCard message="Concept not specified" />;
}
```

### Invalid Concept for Subject

**Scenario**: Concept ID doesn't exist for the selected subject

**Handling**:
- Check if `remediationContentBySubject[selectedSubject][conceptId]` exists
- If not found, display error card with message
- Provide button to return to dashboard

**Implementation**:
```typescript
const content = remediationContentBySubject[selectedSubject]?.[conceptId];

if (!content) {
  return <ErrorCard message="Concept not found for this subject" />;
}
```

### Context Provider Missing

**Scenario**: Component tries to use `useSubject()` outside of `SubjectProvider`

**Handling**:
- Throw descriptive error in `useSubject()` hook
- Ensure `SubjectProvider` wraps entire app in `layout.tsx`

**Implementation**:
```typescript
export function useSubject() {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error('useSubject must be used within SubjectProvider');
  }
  return context;
}
```

## Testing Strategy

### Unit Tests

The application will use **Jest** and **React Testing Library** for unit testing. Tests will focus on:

**Subject Context Tests**:
- SubjectProvider provides context correctly
- useSubject hook throws error outside provider
- setSelectedSubject updates state
- getSubjectInfo returns correct subject metadata

**Data Structure Tests**:
- All four subjects have quiz questions
- All four subjects have weak concepts
- All four subjects have remediation content
- Each subject has at least 5 questions
- Each subject has at least 3 weak concepts

**Component Tests**:
- Profile page stores subject on selection
- Quiz page redirects when subject is missing
- Dashboard page displays correct weak concepts for subject
- Remediation page displays correct content for subject and concept
- Error states display correctly

**Example unit tests**:
```typescript
describe('SubjectContext', () => {
  it('should store selected subject', () => {
    const { result } = renderHook(() => useSubject(), {
      wrapper: SubjectProvider
    });
    
    act(() => {
      result.current.setSelectedSubject('physics');
    });
    
    expect(result.current.selectedSubject).toBe('physics');
  });
});

describe('Quiz Page', () => {
  it('should redirect to profile when no subject selected', () => {
    const mockPush = jest.fn();
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue({
      push: mockPush
    });
    
    render(<QuizPage />, {
      wrapper: ({ children }) => (
        <SubjectProvider>
          {children}
        </SubjectProvider>
      )
    });
    
    expect(mockPush).toHaveBeenCalledWith('/profile');
  });
});
```

### Property-Based Tests

The application will use **fast-check** for property-based testing. Each test will run a minimum of 100 iterations.

Property tests will verify:

**Property 1: Subject Selection Storage**
- Generate random valid subject IDs
- Verify subject is stored in state after selection
- **Feature: subject-specific-content, Property 1: Subject selection storage**

**Property 2: Subject State Persistence**
- Generate random valid subject IDs
- Set subject in state and navigate to different pages
- Verify subject remains in state across navigation
- **Feature: subject-specific-content, Property 2: Subject state persistence**

**Property 3: Missing Subject Redirection**
- Generate random page paths (quiz, dashboard, remediation)
- Clear subject state and attempt navigation
- Verify redirect to profile page occurs
- **Feature: subject-specific-content, Property 3: Missing subject redirection**

**Property 4: Subject-Specific Quiz Questions**
- Generate random valid subject IDs
- Load quiz questions for each subject
- Verify all questions have matching subject field
- **Feature: subject-specific-content, Property 4: Subject-specific quiz questions**

**Property 5: Subject Validation**
- Generate random strings (valid and invalid subject IDs)
- Attempt to set as selected subject
- Verify only valid subjects are accepted
- **Feature: subject-specific-content, Property 5: Subject validation**

**Property 6: Subject-Specific Weak Concepts**
- Generate random valid subject IDs
- Load weak concepts for each subject
- Verify all weak concepts have matching subject field
- **Feature: subject-specific-content, Property 6: Subject-specific weak concepts**

**Property 7: Subject-Specific Remediation Content**
- Generate random valid subject and concept ID pairs
- Load remediation content for each pair
- Verify content has matching subject and concept fields
- **Feature: subject-specific-content, Property 7: Subject-specific remediation content**

### Integration Tests

- Full user flow: select subject → quiz → dashboard → remediation
- Subject persistence across page refreshes (if using localStorage)
- Error handling flow: missing subject → redirect → select subject → continue
- Multiple subject switches in one session

### Testing Balance

- Unit tests handle specific examples, data structure validation, and error cases
- Property tests verify behavior across all valid subject combinations
- Integration tests ensure the complete user journey works correctly
- Both unit and property tests are necessary for comprehensive coverage
