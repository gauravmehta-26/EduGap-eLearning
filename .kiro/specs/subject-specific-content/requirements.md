# Requirements Document

## Introduction

This document outlines the requirements for implementing subject-specific quiz questions and remediation content in the EduGap application. Currently, the application allows users to select a subject (Physics, Mathematics, Chemistry, Biology) but displays the same quiz questions and remediation content regardless of the selected subject. This feature will ensure that quiz questions and remediation content are tailored to the selected subject.

## Glossary

- **System**: The EduGap web application
- **User**: A student using the application
- **Subject**: An academic discipline (Physics, Mathematics, Chemistry, or Biology)
- **Quiz_Question**: A multiple-choice question specific to a subject
- **Remediation_Content**: Educational material specific to a weak concept within a subject
- **Subject_Context**: The currently selected subject stored in application state

## Requirements

### Requirement 1: Subject Selection Persistence

**User Story:** As a user, I want my subject selection to be remembered throughout my quiz session, so that I receive subject-appropriate questions and remediation.

#### Acceptance Criteria

1. WHEN a user selects a subject on the profile page, THE System SHALL store the selected subject in application state
2. WHEN a user navigates to the quiz page, THE System SHALL retrieve the selected subject from application state
3. WHEN a user navigates to the dashboard page, THE System SHALL maintain the selected subject in application state
4. WHEN a user navigates to the remediation page, THE System SHALL retrieve the selected subject from application state
5. IF no subject is selected, THE System SHALL redirect the user to the profile page

### Requirement 2: Subject-Specific Quiz Questions

**User Story:** As a user, I want to receive quiz questions relevant to my selected subject, so that the assessment accurately identifies my knowledge gaps in that subject.

#### Acceptance Criteria

1. THE System SHALL maintain separate question sets for each subject (Physics, Mathematics, Chemistry, Biology)
2. WHEN a user starts a quiz, THE System SHALL display questions from the selected subject's question set
3. THE System SHALL provide at least 5 questions per subject
4. WHEN displaying a question, THE System SHALL ensure it belongs to the currently selected subject
5. THE System SHALL NOT display questions from other subjects during a quiz session

### Requirement 3: Subject-Specific Weak Concepts

**User Story:** As a user, I want to see weak concepts relevant to my selected subject on the dashboard, so that I can focus on improving in that specific subject.

#### Acceptance Criteria

1. THE System SHALL maintain separate weak concept lists for each subject
2. WHEN displaying the dashboard, THE System SHALL show weak concepts from the selected subject only
3. THE System SHALL display the subject name on the dashboard
4. WHEN calculating risk scores, THE System SHALL base calculations on the selected subject's performance
5. THE System SHALL provide at least 3 weak concepts per subject

### Requirement 4: Subject-Specific Remediation Content

**User Story:** As a user, I want to access remediation content specific to my selected subject, so that I can learn concepts relevant to that subject.

#### Acceptance Criteria

1. THE System SHALL maintain separate remediation content for each subject's weak concepts
2. WHEN a user accesses remediation for a weak concept, THE System SHALL display content specific to that concept within the selected subject
3. THE System SHALL ensure remediation content matches the subject context
4. IF a concept ID does not exist for the selected subject, THE System SHALL display an appropriate error message
5. THE System SHALL display the subject name on the remediation page

### Requirement 5: Data Structure Organization

**User Story:** As a developer, I want quiz questions and remediation content organized by subject, so that the codebase is maintainable and extensible.

#### Acceptance Criteria

1. THE System SHALL organize quiz questions in a data structure keyed by subject ID
2. THE System SHALL organize weak concepts in a data structure keyed by subject ID
3. THE System SHALL organize remediation content in a data structure keyed by subject ID and concept ID
4. THE System SHALL use TypeScript types to enforce subject-specific data structures
5. THE System SHALL maintain backward compatibility with existing mock data structure

### Requirement 6: Subject Context Validation

**User Story:** As a user, I want the application to handle missing or invalid subject selections gracefully, so that I have a smooth experience.

#### Acceptance Criteria

1. WHEN a user attempts to access the quiz page without selecting a subject, THE System SHALL redirect to the profile page
2. WHEN a user attempts to access the dashboard without completing a quiz, THE System SHALL redirect to the quiz page
3. WHEN a user attempts to access remediation without a valid concept ID, THE System SHALL display an error message
4. THE System SHALL validate that the selected subject is one of the supported subjects (Physics, Mathematics, Chemistry, Biology)
5. IF the subject context is lost, THE System SHALL redirect the user to the profile page

### Requirement 7: Subject Display

**User Story:** As a user, I want to see which subject I'm currently working on, so that I have context for my learning activities.

#### Acceptance Criteria

1. WHEN a user is on the quiz page, THE System SHALL display the selected subject name
2. WHEN a user is on the dashboard page, THE System SHALL display the selected subject name
3. WHEN a user is on the remediation page, THE System SHALL display the selected subject name
4. THE System SHALL display the subject icon alongside the subject name
5. THE System SHALL use consistent styling for subject display across all pages
