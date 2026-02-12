'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from 'recharts';
import Card from '../ui/Card';
import { SubjectId } from '@/lib/types';
import { AnalyzeResponse } from '@/lib/api';

interface PerformanceChartsProps {
  subjectPerformance: {
    subject: string;
    score: number;
  }[];
  actualScore?: number | null;
  selectedSubject?: SubjectId | null;
  quizResult?: AnalyzeResponse | null;
}

export default function PerformanceCharts({ 
  subjectPerformance, 
  actualScore, 
  selectedSubject,
  quizResult 
}: PerformanceChartsProps) {
  // Update the performance data with actual quiz score if available
  const updatedPerformance = subjectPerformance.map(item => {
    if (selectedSubject && item.subject.toLowerCase() === selectedSubject.toLowerCase() && actualScore !== null && actualScore !== undefined) {
      return { ...item, score: actualScore };
    }
    return item;
  });

  // Transform data for radar chart (knowledge gaps = 100 - score)
  const radarData = updatedPerformance.map(item => ({
    subject: item.subject,
    gap: 100 - item.score,
    fullMark: 100,
  }));

  // Create quiz progress data if we have quiz results
  const quizProgressData = quizResult ? [
    { name: 'Correct', value: quizResult.correctAnswers, fill: '#10b981' },
    { name: 'Incorrect', value: quizResult.totalQuestions - quizResult.correctAnswers, fill: '#ef4444' },
  ] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Bar Chart - Subject Performance */}
      <Card className="hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-bold text-slate-800">
            Subject Performance
          </h2>
          {actualScore !== null && actualScore !== undefined && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
              Latest: {actualScore}%
            </span>
          )}
        </div>
        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
          <BarChart data={updatedPerformance}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="subject" 
              tick={{ fontSize: 12, fill: '#475569' }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 12, fill: '#475569' }}
              axisLine={{ stroke: '#cbd5e1' }}
              label={{ value: 'Score %', angle: -90, position: 'insideLeft', style: { fill: '#475569' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '12px'
              }}
              labelStyle={{ fontWeight: 600, color: '#1e293b' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingTop: '10px' }} 
              iconType="circle"
            />
            <Bar 
              dataKey="score" 
              fill="url(#colorScore)" 
              name="Score %" 
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Radar Chart - Knowledge Gap Analysis */}
      <Card className="hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-6">
          Knowledge Gap Analysis
        </h2>
        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
          <RadarChart data={radarData}>
            <defs>
              <linearGradient id="colorGap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }} 
            />
            <PolarRadiusAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 12, fill: '#475569' }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <Radar
              name="Knowledge Gap %"
              dataKey="gap"
              stroke="#ef4444"
              fill="url(#colorGap)"
              fillOpacity={0.6}
              animationDuration={1000}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '12px'
              }}
              labelStyle={{ fontWeight: 600, color: '#1e293b' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingTop: '10px' }} 
              iconType="circle"
            />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      {/* Quiz Results Card - Only show if we have quiz results */}
      {quizResult && (
        <Card className="lg:col-span-2 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-6">
            Latest Quiz Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Score Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <div className="text-sm font-medium text-blue-700 mb-2">Your Score</div>
              <div className="text-4xl font-bold text-blue-600 mb-1">
                {actualScore}%
              </div>
              <div className="text-xs text-blue-600">
                {quizResult.correctAnswers} out of {quizResult.totalQuestions} correct
              </div>
            </div>

            {/* Failure Risk Card */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
              <div className="text-sm font-medium text-red-700 mb-2">Failure Risk</div>
              <div className="text-4xl font-bold text-red-600 mb-1">
                {quizResult.failureRisk}%
              </div>
              <div className="text-xs text-red-600">
                Based on your performance
              </div>
            </div>

            {/* Weak Concepts Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <div className="text-sm font-medium text-purple-700 mb-2">Weak Areas</div>
              <div className="text-4xl font-bold text-purple-600 mb-1">
                {quizResult.weakConcepts.length}
              </div>
              <div className="text-xs text-purple-600">
                Concepts need attention
              </div>
            </div>
          </div>

          {/* Summary */}
          {quizResult.summary && (
            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Analysis Summary</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{quizResult.summary}</p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
