
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  textColor?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40, textColor = "text-gray-900", showText = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div style={{ width: size, height: size }} className="relative flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Shield Base */}
          <path
            d="M50 5L15 20V45C15 67.5 30 88 50 95C70 88 85 67.5 85 45V20L50 5Z"
            fill="url(#logo-gradient)"
          />
          
          {/* Internal Detail / Checkmark Path */}
          <path
            d="M35 50L45 60L65 40"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Decorative AI Node Dot */}
          <circle cx="50" cy="15" r="3" fill="white" fillOpacity="0.6" />
          
          <defs>
            <linearGradient id="logo-gradient" x1="15" y1="5" x2="85" y2="95" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563eb" />
              <stop offset="1" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`text-xl font-black tracking-tighter leading-none ${textColor}`}>
            BHARAT<span className="text-blue-600">VERIFY</span>
          </span>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
            AI Content Guardian
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
