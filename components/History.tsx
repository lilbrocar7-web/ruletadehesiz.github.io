import React from 'react';
import { WheelOption } from '../types';

const HistoryItem: React.FC<{ option: WheelOption }> = ({ option }) => {
    return (
        <div className="flex items-center gap-2 bg-gray-700 p-1.5 rounded-full text-white text-xs font-semibold shadow-md">
            <div 
                className="w-4 h-4 rounded-full flex-shrink-0 border-2 border-gray-800"
                style={{ backgroundColor: option.color }}
            ></div>
            <span>{option.label}</span>
        </div>
    );
};

const History: React.FC<{ history: WheelOption[] }> = ({ history }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-gray-800 p-3 rounded-lg shadow-inner">
        <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-3 text-center">History</h3>
        <div className="flex flex-wrap justify-center gap-2">
            {history.map((opt, index) => (
                <HistoryItem key={`${opt.id}-${index}`} option={opt} />
            ))}
        </div>
    </div>
  );
};

export default History;
