import React from 'react';
import { Rocket, Lightbulb, ShoppingCart, Briefcase, Settings } from 'lucide-react';

interface VseCardIconProps {
  iconType: 'rocket' | 'door' | 'cart' | 'marketplaces' | 'tool' | 'algorithm' | 'bulb';
  className?: string;
}

export const VseCardIcon: React.FC<VseCardIconProps> = ({ iconType, className = "w-12 h-12" }) => {
  switch (iconType) {
    case 'rocket':
      return (
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          {/* Main Rocket body */}
          <path d="M24 6C17 12 16 22 16 28L24 33L32 28C32 22 31 12 24 6Z" />
          {/* Rocket Porpoise/Window */}
          <circle cx="24" cy="18" r="3" />
          {/* Left Wing */}
          <path d="M16 25L9 29L12 35L17 32" />
          {/* Right Wing */}
          <path d="M32 25L39 29L36 35L31 32" />
          {/* Thruster Flame */}
          <path d="M21 34L24 41L27 34" stroke="currentColor" />
        </svg>
      );

    case 'door':
      return (
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          {/* Door Frame Outer */}
          <rect x="14" y="8" width="20" height="32" rx="2" />
          {/* Door Knob / Lock */}
          <circle cx="20" cy="24" r="1.5" fill="currentColor" />
          {/* Threshold Line */}
          <path d="M10 40H38" />
        </svg>
      );

    case 'cart':
      return (
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          {/* Shopping Cart body */}
          <path d="M8 12H13L17 28H33L37 16H15" />
          {/* Wheels */}
          <circle cx="20" cy="34" r="2.5" />
          <circle cx="31" cy="34" r="2.5" />
          {/* Package / Box beside */}
          <path d="M37 28L42 25L42 33L37 36Z" stroke="currentColor" />
          <path d="M37 28L32 25L37 22L42 25" stroke="currentColor" />
          <path d="M37 28L37 36" stroke="currentColor" />
        </svg>
      );

    case 'marketplaces':
      return (
        <svg 
          viewBox="0 54 48" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          {/* Mini Badges for ML, Amazon, Shopee */}
          {/* ML Badge */}
          <rect x="7" y="6" width="11" height="8" rx="1.5" stroke="currentColor" />
          <text x="12.5" y="12" fill="currentColor" fontSize="4.2" fontWeight="bold" textAnchor="middle">ML</text>
          
          {/* Amazon Badge */}
          <rect x="21" y="6" width="12" height="8" rx="1.5" stroke="currentColor" />
          <text x="27" y="12" fill="currentColor" fontSize="3.8" fontWeight="bold" textAnchor="middle">AMZ</text>
          
          {/* Shopee Badge */}
          <rect x="36" y="6" width="11" height="8" rx="1.5" stroke="currentColor" />
          <text x="41.5" y="12" fill="currentColor" fontSize="4.2" fontWeight="bold" textAnchor="middle">SHP</text>

          {/* Shopping Cart beneath */}
          <path d="M12 24H16L20 37H36L40 27H18" strokeWidth="2.2" />
          <circle cx="23" cy="42" r="2.5" />
          <circle cx="34" cy="42" r="2.5" />
        </svg>
      );

    case 'tool':
      return (
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          {/* Briefcase Handle */}
          <path d="M20 13V10C20 8.89543 20.8954 8 22 8H26C27.1046 8 28 8.89543 28 10V13" />
          {/* Briefcase Body */}
          <rect x="11" y="13" width="26" height="23" rx="3" />
          {/* Center Gear / Sun in suitcase */}
          <circle cx="24" cy="24.5" r="4" stroke="currentColor" />
          {/* Gear teeth */}
          <path d="M24 17.5V19.5" stroke="currentColor" />
          <path d="M24 29.5V31.5" stroke="currentColor" />
          <path d="M17 24.5H19" stroke="currentColor" />
          <path d="M29 24.5H31" stroke="currentColor" />
        </svg>
      );

    case 'algorithm':
      return (
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          {/* Left Bracket */}
          <path d="M16 12H12V36H16" />
          {/* Right Bracket */}
          <path d="M32 12H36V36H32" />
          {/* Algorithm list / equals lines */}
          <line x1="18" y1="19" x2="30" y2="19" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="18" cy="19" r="1.2" fill="currentColor" />
          <line x1="18" y1="24" x2="30" y2="24" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="18" cy="24" r="1.2" fill="currentColor" />
          <line x1="18" y1="29" x2="30" y2="29" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="18" cy="29" r="1.2" fill="currentColor" />
        </svg>
      );

    case 'bulb':
      return (
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          {/* Lightbulb outline */}
          <path d="M24 10C18.4772 10 14 14.4772 14 20C14 23.5 16 26.5 18 29V33C18 33.5523 18.4477 34 19 34H29C29.5523 34 30 33.5523 30 33V29C32 26.5 34 23.5 34 20C34 14.4772 29.5228 10 24 10Z" />
          {/* Base screw lines */}
          <line x1="20" y1="37" x2="28" y2="37" stroke="currentColor" />
          <line x1="22" y1="40" x2="26" y2="40" stroke="currentColor" />
          {/* Glowing rays */}
          <line x1="24" y1="4" x2="24" y2="7" stroke="currentColor" />
          <line x1="11" y1="11" x2="13" y2="13" stroke="currentColor" />
          <line x1="37" y1="11" x2="35" y2="13" stroke="currentColor" />
        </svg>
      );

    default:
      return <Rocket className={className} />;
  }
};
