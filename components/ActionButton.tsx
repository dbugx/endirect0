
import React from 'react';

interface ActionButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  title: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, children, title }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
    >
      {children}
    </button>
  );
};
