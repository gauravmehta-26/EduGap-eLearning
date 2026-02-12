'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showStudyLevelModal, setShowStudyLevelModal] = useState(false);
  const [studyLevel, setStudyLevel] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Load study level from localStorage
    const preferences = localStorage.getItem('userPreferences');
    if (preferences) {
      const parsed = JSON.parse(preferences);
      setStudyLevel(parsed.studyLevel || '');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    router.push('/login');
  };

  const handleStudyLevelChange = (newLevel: string) => {
    const preferences = localStorage.getItem('userPreferences');
    if (preferences) {
      const parsed = JSON.parse(preferences);
      parsed.studyLevel = newLevel;
      localStorage.setItem('userPreferences', JSON.stringify(parsed));
      setStudyLevel(newLevel);
      setShowStudyLevelModal(false);
    }
  };

  const studyLevelOptions = ['Below 10th', '10th', '12th', 'JEE', 'College Examination'];

  const menuItems = [
    { icon: '👤', label: 'Personal Details', action: () => console.log('Personal Details') },
    { icon: '📚', label: `Study Level: ${studyLevel}`, action: () => setShowStudyLevelModal(true) },
    { icon: '🔒', label: 'Change Password', action: () => console.log('Change Password') },
    { icon: '🔐', label: 'Privacy Settings', action: () => console.log('Privacy') },
    { icon: '🚪', label: 'Logout', action: handleLogout, danger: true },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">JD</span>
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-semibold text-slate-900">John Doe</div>
          <div className="text-xs text-slate-500">student@example.com</div>
        </div>
        <svg
          className={`w-4 h-4 text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
          >
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  if (!item.label.includes('Study Level')) {
                    setIsOpen(false);
                  }
                }}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-slate-50 transition-colors ${
                  item.danger ? 'text-red-600' : 'text-slate-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Study Level Modal */}
      <AnimatePresence>
        {showStudyLevelModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setShowStudyLevelModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 z-50 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4">Change Study Level</h3>
              <div className="space-y-2">
                {studyLevelOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => handleStudyLevelChange(option)}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                      studyLevel === option
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowStudyLevelModal(false)}
                className="mt-4 w-full py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
