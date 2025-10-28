import React from 'react';
import { WheelOption } from '../types';

interface OptionsEditorProps {
  options: WheelOption[];
  onUpdateOption: (id: string, label: string) => void;
  onDeleteOption: (id: string) => void;
  onAddOption: () => void;
}

const OptionsEditor: React.FC<OptionsEditorProps> = ({ options, onUpdateOption, onDeleteOption, onAddOption }) => {
  return (
    <div className="w-full bg-gray-800 p-4 rounded-lg shadow-inner flex flex-col gap-3 max-h-[400px]">
       <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-widest text-center mb-2">Edit Options</h3>
       <div className="flex-grow overflow-y-auto pr-2 space-y-2">
            {options.map((option) => (
            <div key={option.id} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: option.color }}></div>
                <input
                type="text"
                value={option.label}
                onChange={(e) => onUpdateOption(option.id, e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-2 py-1 border-2 border-transparent focus:border-yellow-400 focus:outline-none"
                placeholder="Option label"
                />
                <button
                onClick={() => onDeleteOption(option.id)}
                aria-label={`Delete ${option.label}`}
                className="bg-red-600 hover:bg-red-700 text-white font-bold w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-colors"
                >
                &ndash;
                </button>
            </div>
            ))}
       </div>
      <button
        onClick={onAddOption}
        className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-colors"
      >
        + Add Option
      </button>
    </div>
  );
};

export default OptionsEditor;
