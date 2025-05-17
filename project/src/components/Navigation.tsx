import React from 'react';

interface NavigationProps {
  onNavigate: (page: 'home' | 'about') => void;
  currentPage: 'home' | 'about';
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentPage }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-gray-800">
              Chat Analyzer
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'home' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'about' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;