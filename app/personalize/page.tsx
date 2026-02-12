'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function PersonalizePage() {
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [studyHours, setStudyHours] = useState('');
  const [studyLevel, setStudyLevel] = useState('');

  const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Python', 'DSA', 'English', 'JAVA'];
  const studyHoursOptions = ['1-3 hr', '4-5 hr', 'More than 5 hr'];
  const studyLevelOptions = ['Below 10th', '10th', '12th', 'JEE', 'College Examination'];

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = () => {
    if (selectedSubjects.length === 0 || !studyHours || !studyLevel) {
      alert('Please complete all fields');
      return;
    }

    // Store preferences in localStorage
    localStorage.setItem('userPreferences', JSON.stringify({
      subjects: selectedSubjects,
      studyHours,
      studyLevel
    }));

    router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Personalize Your Learning</h1>
        <p className="text-gray-600 mb-8 text-center">Help us customize your experience</p>

        {/* Subjects Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Subjects</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {subjects.map(subject => (
              <button
                key={subject}
                onClick={() => toggleSubject(subject)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedSubjects.includes(subject)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Study Hours */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Study Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {studyHoursOptions.map(option => (
              <button
                key={option}
                onClick={() => setStudyHours(option)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  studyHours === option
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Study Level */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Study Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {studyLevelOptions.map(option => (
              <button
                key={option}
                onClick={() => setStudyLevel(option)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  studyLevel === option
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full py-3 text-lg"
        >
          Continue to Profile
        </Button>
      </Card>
    </div>
  );
}
