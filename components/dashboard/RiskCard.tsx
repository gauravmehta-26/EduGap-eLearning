import Card from '../ui/Card';

interface RiskCardProps {
  riskPercentage: number;
}

export default function RiskCard({ riskPercentage }: RiskCardProps) {
  // Determine risk level and colors
  const getRiskLevel = (risk: number) => {
    if (risk >= 70) return { level: 'High', color: 'red', bgGradient: 'from-red-50 to-orange-50', borderColor: 'border-red-200' };
    if (risk >= 40) return { level: 'Medium', color: 'yellow', bgGradient: 'from-yellow-50 to-amber-50', borderColor: 'border-yellow-200' };
    return { level: 'Low', color: 'green', bgGradient: 'from-green-50 to-emerald-50', borderColor: 'border-green-200' };
  };

  const riskInfo = getRiskLevel(riskPercentage);

  return (
    <Card className={`text-center shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${riskInfo.bgGradient} border-2 ${riskInfo.borderColor}`}>
      <div className="mb-4">
        <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold bg-${riskInfo.color}-100 text-${riskInfo.color}-700 border border-${riskInfo.color}-200`}>
          {riskInfo.level} Risk
        </span>
      </div>
      <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-6">
        Exam Failure Risk
      </h2>
      <div className="relative inline-block">
        <svg className="w-32 h-32 sm:w-40 sm:h-40 transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="10"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={riskInfo.color === 'red' ? '#ef4444' : riskInfo.color === 'yellow' ? '#f59e0b' : '#10b981'}
            strokeWidth="10"
            strokeDasharray={`${(riskPercentage / 100) * 314} 314`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-4xl sm:text-5xl font-bold text-${riskInfo.color}-600`}>
              {riskPercentage}%
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4">
        Based on your diagnostic assessment
      </p>
    </Card>
  );
}
