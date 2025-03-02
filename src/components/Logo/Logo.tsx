import React from 'react';
import { CatIcon } from '../CatIcon';
import { useTheme } from '../../ThemeContext';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true }) => {
  const { isDark } = useTheme();
  
  const sizeMap = {
    small: { icon: 6, text: 'text-lg' },
    medium: { icon: 8, text: 'text-xl' },
    large: { icon: 12, text: 'text-2xl' }
  };
  
  return (
    <div className="flex items-center space-x-2">
      <CatIcon 
        className={`w-${sizeMap[size].icon} h-${sizeMap[size].icon} ${isDark ? 'text-purple-400' : 'text-purple-600'}`} 
      />
      {showText && (
        <span className={`${sizeMap[size].text} font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          B-Wiize
        </span>
      )}
    </div>
  );
};