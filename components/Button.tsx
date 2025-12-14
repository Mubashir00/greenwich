import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}

// A reusable button component with conditional styling based on 'isActive' prop
const Button: React.FC<ButtonProps> = ({ label, onClick, isActive = false, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-3 rounded-lg text-lg font-bold transition-all duration-200 shadow-sm
        ${isActive 
          ? 'bg-blue-600 text-white shadow-inner scale-95 ring-2 ring-blue-300' 
          : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md active:scale-95'
        }
        ${className}
      `}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
};

export default Button;