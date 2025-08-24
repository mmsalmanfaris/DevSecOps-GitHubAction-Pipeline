import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinningSquare: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare }) => {
  const baseClasses = "w-full h-full text-3xl md:text-4xl font-extrabold flex items-center justify-center rounded-md transition-all duration-200 focus:outline-none";

  // Different styling based on value and winning status
  const getSquareClasses = () => {
    if (isWinningSquare) {
      return `${baseClasses} bg-gradient-to-br from-green-50 to-green-100 text-green-800 ring-2 ring-green-400`;
    }

    if (!value) {
      return `${baseClasses} bg-white hover:bg-gray-50 cursor-pointer border border-gray-200`;
    }

    if (value === 'X') {
      return `${baseClasses} bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-700`;
    }

    return `${baseClasses} bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700`;
  };

  return (
    <button
      className={getSquareClasses()}
      onClick={onClick}
      aria-label={value ? `Square with ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
};

export default Square;