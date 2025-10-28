import React from 'react';
import { SPIN_DURATION_S } from '../constants';
import { WheelOption } from '../types';

const RouletteWheel: React.FC<{ rotation: number; options: WheelOption[] }> = ({ rotation, options }) => {
  const totalOptions = options.length;

  if (totalOptions === 0) {
    return (
      <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border-8 border-yellow-600 bg-gray-700 shadow-2xl flex items-center justify-center">
        <div className="text-gray-400 text-center p-4">Add options to play!</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 bg-yellow-400 rounded-full border-4 border-yellow-600 flex items-center justify-center z-10">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    );
  }

  const segmentAngle = 360 / totalOptions;

  const gradientStops = options.map((option, index) => 
    `${option.color} ${index * segmentAngle}deg ${(index + 1) * segmentAngle}deg`
  ).join(', ');

  const gradientStyle = {
    // Offset the gradient so the pointer aligns with the center of a segment
    background: `conic-gradient(from -${segmentAngle / 2}deg, ${gradientStops})`,
  };

  return (
    <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border-8 border-yellow-600 bg-gray-700 shadow-2xl">
      <div
        className="relative w-full h-full rounded-full overflow-hidden transition-transform"
        style={{ 
          transform: `rotate(${rotation}deg)`, 
          transition: `transform ${SPIN_DURATION_S}s linear` 
        }}
      >
        <div 
          className="absolute w-full h-full rounded-full"
          style={gradientStyle}
        />
        {/* Container for labels so they spin with the wheel */}
        <div className="absolute w-full h-full">
            {options.map((option, index) => {
                const angle = index * segmentAngle;
                const labelAngle = angle + segmentAngle / 2;
                const isFlipped = labelAngle > 90 && labelAngle < 270;
                
                // Dynamically adjust font size for better readability with more options
                const fontSize = totalOptions > 12 ? '0.6rem' : totalOptions > 8 ? '0.75rem' : '0.875rem';
                
                return (
                   <div
                      key={option.id}
                      className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 origin-bottom flex items-start justify-center pt-8 md:pt-12"
                      style={{
                          transform: `rotate(${labelAngle}deg)`,
                          fontSize
                      }}
                   >
                      <span 
                        className="text-white font-bold text-center break-words px-2"
                        style={{
                          display: 'block',
                          width: 'max-content',
                          maxWidth: '120px',
                          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                          transform: isFlipped ? 'rotate(180deg)' : 'none',
                        }}
                      >
                         {option.label}
                      </span>
                   </div>
                )
            })}
        </div>

      </div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 bg-yellow-400 rounded-full border-4 border-yellow-600 flex items-center justify-center z-10">
         <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  );
};

export default RouletteWheel;
