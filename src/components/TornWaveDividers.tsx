import React from 'react';

/**
 * Replicates the organic torn paper / undulating wave divider
 * shown in the reference image between light blush and deep cocoa sections.
 */
export const TopTornWave: React.FC<{ fillColor?: string; className?: string }> = ({
  fillColor = '#2D101E',
  className = '',
}) => {
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-12 md:h-20 lg:h-24 block preserve-3d"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 
             C120,45 280,75 480,60 
             C640,48 760,25 920,40 
             C1080,55 1240,90 1440,50 
             L1440,120 L0,120 Z"
          fill={fillColor}
        />
        {/* Subtle deckled edge highlight */}
        <path
          d="M0,2 
             C120,46 280,76 480,61 
             C640,49 760,26 920,41 
             C1080,56 1240,91 1440,51"
          stroke="rgba(244, 175, 195, 0.25)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
};

export const BottomTornWave: React.FC<{ fillColor?: string; className?: string }> = ({
  fillColor = '#2D101E',
  className = '',
}) => {
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-12 md:h-18 lg:h-22 block"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 
             L1440,0 
             L1440,60 
             C1280,25 1120,70 960,50 
             C800,30 640,65 480,45 
             C320,25 160,55 0,35 Z"
          fill={fillColor}
        />
        <path
          d="M0,36 
             C160,56 320,26 480,46 
             C640,66 800,31 960,51 
             C1120,71 1280,26 1440,61"
          stroke="rgba(244, 175, 195, 0.2)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
};
