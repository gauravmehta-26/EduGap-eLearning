'use client';

import { useRouter } from 'next/navigation';
import { WeakConcept } from '@/lib/types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface WeakConceptsListProps {
  concepts: WeakConcept[];
}

export default function WeakConceptsList({ concepts }: WeakConceptsListProps) {
  const router = useRouter();

  const handleFixNow = (conceptId: string | number) => {
    router.push(`/remediation?concept=${conceptId}`);
  };

  return (
    <Card>
      <h2 className="text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
        Weak Concepts
      </h2>
      <div className="space-y-4 sm:space-y-5">
        {concepts.map((concept) => (
          <div key={concept.id} className="border-b border-gray-200 pb-4 sm:pb-5 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-start mb-2 sm:mb-3">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800">{concept.name}</h3>
              <span className="text-xs sm:text-sm font-bold text-red-600 ml-2">
                {concept.riskPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3 sm:mb-4 shadow-inner">
              <div
                className="bg-red-500 h-2.5 rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${concept.riskPercentage}%` }}
              />
            </div>
            <Button
              variant="primary"
              onClick={() => handleFixNow(concept.id)}
              fullWidth
            >
              Fix Now
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
