
import React from 'react';
import { VerificationStatus } from '../types';

interface TruthMeterProps {
  score: number;
  status: VerificationStatus;
}

const TruthMeter: React.FC<TruthMeterProps> = ({ score, status }) => {
  const getStatusStyle = (status: VerificationStatus) => {
    switch (status) {
      case VerificationStatus.VERIFIED: return 'text-emerald-700 bg-emerald-100 border-emerald-200';
      case VerificationStatus.PARTIALLY_TRUE: return 'text-amber-700 bg-amber-100 border-amber-200';
      case VerificationStatus.FALSE: return 'text-rose-700 bg-rose-100 border-rose-200';
      default: return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  const getGaugeColor = (score: number) => {
    if (score > 75) return '#10b981'; // emerald-500
    if (score > 40) return '#f59e0b'; // amber-500
    return '#f43f5e'; // rose-500
  };

  // Semi-circle gauge logic
  const radius = 80;
  const strokeWidth = 14;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI; // Half circle
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center pt-4">
        <svg
          height={radius + 20}
          width={radius * 2 + 20}
          className="transform rotate-0"
        >
          {/* Background Arc */}
          <path
            d={`M 10,${radius + 10} A ${normalizedRadius},${normalizedRadius} 0 0,1 ${radius * 2 + 10},${radius + 10}`}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress Arc */}
          <path
            d={`M 10,${radius + 10} A ${normalizedRadius},${normalizedRadius} 0 0,1 ${radius * 2 + 10},${radius + 10}`}
            fill="none"
            stroke={getGaugeColor(score)}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-out' }}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <div className="flex flex-col items-center mt-6">
            <span className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
              {score}<span className="text-xl text-slate-400 font-bold">%</span>
            </span>
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mt-1">
              TRUTH SCORE
            </span>
          </div>
        </div>
      </div>
      
      <div className={`mt-6 px-6 py-2 rounded-2xl border-2 text-sm font-black tracking-wide shadow-md transform hover:scale-105 transition-transform ${getStatusStyle(status)}`}>
        {status.toUpperCase()}
      </div>
      
      <div className="mt-4 flex gap-4 w-full px-2">
        <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-rose-500 transition-all duration-1000" 
            style={{ width: score < 40 ? `${score}%` : '100%', opacity: score < 40 ? 1 : 0.2 }}
          ></div>
        </div>
        <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-500 transition-all duration-1000" 
            style={{ width: score >= 40 && score <= 75 ? `${(score-40)/35*100}%` : score > 75 ? '100%' : '0%', opacity: score >= 40 && score <= 75 ? 1 : 0.2 }}
          ></div>
        </div>
        <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-1000" 
            style={{ width: score > 75 ? `${(score-75)/25*100}%` : '0%', opacity: score > 75 ? 1 : 0.2 }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TruthMeter;
