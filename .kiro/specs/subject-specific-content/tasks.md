# Implementation Plan: Subject-Specific Content

## Overview

This plan implements subject-specific quiz questions and remediation content by reorganizing mock data into subject-keyed structures and using React Context to persist subject selection across pages. Tasks are ordered to build incrementally: data structure updates → context provider → page updates → testing.

## Tasks

- [x] 1. Update type definitions and data structures
  - Add `SubjectId` type and update existing types with subject field
  - Create `Subject` interface and `SubjectContextType` interface
  - Update `QuizQuestion`, `WeakConcept`, and `RemediationContent` types to include subject field
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 2. Reorganize mock data by subject
  - [x] 2.1 Create `quizQuestionsBySubject` with 5 questions per subject
    - Physics: electrostatics, mechanics, waves, optics, thermodynamics questions
    - Mathematics: calculus, algebra, trigonometry, geometry, statistics questions
    - Chemistry: organic, inorganic, physical, acids-bases, stoichiometry questions
    - Biology: genetics, cell biology, ecology, evolution, physiology questions
    - _Requirements: 2.1, 2.3_

  - [x] 2.2 Create `weakConceptsBySubject` with 3+ concepts per subject
    - Physics: electrostatics, mechanics, thermodynamics
    - Mathematics: calculus, trigonometry, algebra
    - Chemistry: organic chemistry, acids-bases, stoichiometry
    - Biology: genetics, cell biology, ecology
    - _Requirements: 3.1, 3.5_

  - [x] 2.3 Create `remediationContentBySubject` for all weak concepts
    - Create detailed content for each concept in each subject
    - Include explanation, example, and common mistake for each
    - _Requirements: 4.1_

- [ ]* 2.4 Write unit tests for data structure organization
  - Test all subjects have required data
  - Test minimum question and concept counts
  - _Requirements: 2.1, 2.3, 3.1, 3.5, 4.1_

- [x] 3. Create Subject Context Provider
  - [x] 3.1 Implement SubjectContext with state management
    - Create context with selectedSubject state
    - Implement setSelectedSubject function
    - Implement getSubjectInfo helper function
    - Export SubjectProvider component
    - Export useSubject hook with error handling
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [x] 3.2 Add SubjectProvider to root layout
    - Wrap app content with SubjectProvider in app/layout.tsx
    - Ensure provider wraps all pages
    - _Requirements: 1.1_

- [ ]* 3.3 Write unit tests for Subject Context
  - Test SubjectProvider provides context
  - Test useSubject throws error outside provider
  - Test setSelectedSubject updates state
  - Test getSubjectInfo returns correct metadata
  - _Requirements: 1.1, 1.2_

- [ ]* 3.4 Write property test for subject selection storage
  - **Property 1: Subject Selection Storage**
  - **Validates: Requirements 1.1**
  - Generate random valid subject IDs
  - Verify subject is stored and retrievable

- [x] 4. Update Profile Page
  - [x] 4.1 Integrate useSubject hook in profile page
    - Import and use useSubject hook
    - Update handleStartQuiz to call setSelectedSubject
    - Store selected subject before navigation
    - _Requirements: 1.1_

- [ ]* 4.2 Write unit test for profile subject selection
  - Test subject is stored when user clicks Start Quiz
  - _Requirements: 1.1_

- [x] 5. Update Quiz Page
  - [x] 5.1 Add subject validation and redirection logic
    - Import useSubject hook
    - Add useEffect to check for selectedSubject
    - Redirect to /profile if subject is null
    - _Requirements: 1.2, 1.5, 6.1_

  - [x] 5.2 Load subject-specific quiz questions
    - Get questions from quizQuestionsBySubject[selectedSubject]
    - Display subject name and icon in header
    - _Requirements: 2.2, 2.4, 7.1_

- [ ]* 5.3 Write unit tests for quiz page
  - Test redirect when no subject selected
  - Test correct questions loaded for subject
  - Test subject name displayed
  - _Requirements: 1.5, 2.2, 7.1_

- [ ]* 5.4 Write property test for subject-specific quiz questions
  - **Property 4: Subject-Specific Quiz Questions**
  - **Validates: Requirements 2.2, 2.4, 2.5**
  - Generate random subject IDs
  - Verify all questions match selected subject

- [ ]* 5.5 Write property test for subject validation
  - **Property 5: Subject Validation**
  - **Validates: Requirements 6.4**
  - Generate random strings (valid and invalid)
  - Verify only valid subjects accepted

- [x] 6. Checkpoint - Ensure quiz flow works with subject selection
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Update Dashboard Page
  - [x] 7.1 Add subject validation and redirection logic
    - Import useSubject hook
    - Add useEffect to check for selectedSubject
    - Redirect to /profile if subject is null
    - _Requirements: 1.3, 1.5, 6.1_

  - [x] 7.2 Load subject-specific weak concepts
    - Get weak concepts from weakConceptsBySubject[selectedSubject]
    - Display subject name and icon in header
    - Update risk calculations to use subject-specific data
    - _Requirements: 3.2, 3.3, 7.2_

- [ ]* 7.3 Write unit tests for dashboard page
  - Test redirect when no subject selected
  - Test correct weak concepts loaded for subject
  - Test subject name displayed
  - _Requirements: 1.5, 3.2, 3.3_

- [ ]* 7.4 Write property test for subject-specific weak concepts
  - **Property 6: Subject-Specific Weak Concepts**
  - **Validates: Requirements 3.2**
  - Generate random subject IDs
  - Verify all weak concepts match selected subject

- [x] 8. Update Remediation Page
  - [x] 8.1 Add subject validation and redirection logic
    - Import useSubject hook
    - Add useEffect to check for selectedSubject
    - Redirect to /profile if subject is null
    - _Requirements: 1.4, 1.5, 6.1_

  - [x] 8.2 Load subject-specific remediation content
    - Get content from remediationContentBySubject[selectedSubject][conceptId]
    - Handle missing concept ID error
    - Handle invalid concept for subject error
    - Display subject name and icon in header
    - _Requirements: 4.2, 4.3, 4.4, 6.3, 7.3_

- [ ]* 8.3 Write unit tests for remediation page
  - Test redirect when no subject selected
  - Test correct content loaded for subject and concept
  - Test error display for invalid concept
  - Test subject name displayed
  - _Requirements: 1.5, 4.2, 4.4, 4.5_

- [ ]* 8.4 Write property test for subject-specific remediation content
  - **Property 7: Subject-Specific Remediation Content**
  - **Validates: Requirements 4.2, 4.3**
  - Generate random subject and concept pairs
  - Verify content matches subject and concept

- [x] 9. Implement comprehensive error handling
  - [x] 9.1 Add error handling for invalid subject IDs
    - Validate subject ID against allowed values
    - Clear state and redirect if invalid
    - _Requirements: 6.4_

  - [x] 9.2 Add loading states during redirects
    - Show loading spinner while redirecting
    - Prevent flash of incorrect content
    - _Requirements: 1.5, 6.1_

- [ ]* 9.3 Write unit tests for error handling
  - Test invalid subject ID handling
  - Test missing concept ID handling
  - Test context provider error
  - _Requirements: 6.4, 4.4_

- [ ]* 9.4 Write property test for missing subject redirection
  - **Property 3: Missing Subject Redirection**
  - **Validates: Requirements 1.5, 6.1, 6.5**
  - Generate random page paths
  - Verify redirect to profile when subject missing

- [x] 10. Add subject display across all pages
  - [x] 10.1 Create reusable SubjectHeader component
    - Display subject icon and name
    - Use consistent styling
    - _Requirements: 7.4, 7.5_

  - [x] 10.2 Add SubjectHeader to quiz, dashboard, and remediation pages
    - Import and use SubjectHeader component
    - Pass selected subject info
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ]* 10.3 Write unit tests for subject display
  - Test SubjectHeader renders icon and name
  - Test subject display on all pages
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ]* 11. Write property test for subject state persistence
  - **Property 2: Subject State Persistence**
  - **Validates: Requirements 1.2, 1.3, 1.4**
  - Generate random subject IDs
  - Set subject and navigate to different pages
  - Verify subject persists across navigation

- [x] 12. Final checkpoint - Complete subject-specific content testing
  - Run full user flow: select subject → quiz → dashboard → remediation
  - Test all four subjects work correctly
  - Verify error handling for edge cases
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: All_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check library with minimum 100 iterations
- Focus on ensuring subject context is properly maintained throughout user journey
- All data remains mocked - structure allows future API integration
