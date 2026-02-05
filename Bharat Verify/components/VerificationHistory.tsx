
import React, { useEffect, useState } from 'react';
import { VerificationResult, VerificationStatus } from '../types';

const VerificationHistory: React.FC = () => {
  const [history, setHistory] = useState<VerificationResult[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('bharat_verify_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your verification history?")) {
      localStorage.removeItem('bharat_verify_history');
      setHistory([]);
    }
  };

  const getStatusColor = (status: VerificationStatus) => {
    switch (status) {
      case VerificationStatus.VERIFIED: return 'text-green-600 bg-green-50 border-green-100';
      case VerificationStatus.PARTIALLY_TRUE: return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case VerificationStatus.FALSE: return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <i className="fa-solid fa-file-lines text-blue-500"></i>;
      case 'image': return <i className="fa-solid fa-image text-purple-500"></i>;
      case 'video': return <i className="fa-solid fa-video text-orange-500"></i>;
      default: return <i className="fa-solid fa-circle-info text-gray-500"></i>;
    }
  };

  if (history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
          <i className="fa-solid fa-clock-rotate-left text-3xl"></i>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">No Verification History</h2>
        <p className="text-gray-500 mb-8">Your analyzed content will appear here for quick reference.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Verification History</h2>
          <p className="text-gray-500 text-sm">Review your past fact-checks and forensic analyses.</p>
        </div>
        <button 
          onClick={clearHistory}
          className="text-red-500 text-sm font-semibold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
        >
          <i className="fa-solid fa-trash-can mr-2"></i> Clear History
        </button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-lg mt-1">
                  {getTypeIcon(item.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 line-clamp-1 mb-1">
                    {item.type === 'text' ? item.content : `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} Analysis`}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{item.summary}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-700">{item.score}%</div>
                <div className="text-[8px] uppercase font-bold text-gray-400">Truth Score</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationHistory;
