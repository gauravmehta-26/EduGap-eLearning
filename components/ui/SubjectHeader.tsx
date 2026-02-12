'use client';

import { Subject } from '@/lib/types';

interface SubjectHeaderProps {
  subject: Subject;
  className?: string;
}

export default function SubjectHeader({ subject, className = '' }: SubjectHeaderProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <span className="text-3xl" aria-label={`${subject.name} icon`}>
        {subject.icon}
      </span>
      <h2 
        className="text-xl font-semibold" 
        style={{ color: subject.color }}
      >
        {subject.name}
      </h2>
    </div>
  );
}
