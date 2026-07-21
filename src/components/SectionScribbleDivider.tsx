// src/components/SectionScribbleDivider.tsx

import React from 'react';

// A hand-painted-looking brush-stroke divider between sections, roughened
// with an SVG turbulence filter so the edge reads as a scribble rather than
// a clean sine wave.
const SectionScribbleDivider: React.FC = () => {
  return (
    <div className="section-scribble-divider" aria-hidden="true">
      <svg
        className="section-scribble-svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="scribble-roughen" x="-20%" y="-150%" width="140%" height="400%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.09"
              numOctaves={2}
              seed={7}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={16}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <path
          className="section-scribble-path"
          filter="url(#scribble-roughen)"
          d="M0,58 C70,15 130,95 210,50 C290,8 350,92 430,48
             C505,10 565,96 645,52 C720,12 785,90 865,48
             C940,8 1000,92 1080,50 C1140,20 1175,58 1200,42
             L1200,120 L0,120 Z"
        />
      </svg>
    </div>
  );
};

export default SectionScribbleDivider;
