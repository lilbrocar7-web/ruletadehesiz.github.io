import React from 'react';
import { WheelOption } from '../types';

const ResultDisplay: React.FC<{ result: WheelOption | null; isSpinning: boolean }> = ({ result, isSpinning }) => {
  const content = () => {
    if (isSpinning) {
      return <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400"></div>;
    }
    if (result) {
      return (
        <span className="text-xl md:text-2xl font-bold text-white text-center break-words px-2" style={{ textShadow: '0 0 8px rgba(0,0,0,0.7)' }}>
          {result.label}
        </span>
      );
    }
    return <span className="text-xl font-semibold text-gray-300">Spin to Win!</span>;
  };

  const bgColor = result?.color || '#374151'; // bg-gray-700
  const resultKey = result ? result.id : 'initial';

  return (
    <div className="w-full text-center p-4 rounded-lg bg-gray-800 shadow-inner">
      <h2 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-3">Winner</h2>
      <div
        key={resultKey}
        className={`
          w-40 h-40 mx-auto rounded-full flex items-center justify-center
          border-4 border-gray-600 shadow-lg
          transition-all duration-500 ease-in-out
          p-2
          ${result ? 'animate-pulse' : ''}
        `}
        style={{
          backgroundColor: bgColor,
          animation: result ? 'pulse-effect 1.5s infinite' : 'none',
        }}
      >
        {content()}
      </div>
      <style>{`
        @keyframes pulse-effect {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 10px 15px rgba(250, 204, 21, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default ResultDisplay;
