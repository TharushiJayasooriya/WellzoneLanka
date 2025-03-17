import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const FloatingBackButton = () => {
  const [isFloating, setIsFloating] = useState(false);
  
  // Animation effect - creates a gentle floating motion
  useEffect(() => {
    const floatInterval = setInterval(() => {
      setIsFloating(prev => !prev);
    }, 2000);
    
    return () => clearInterval(floatInterval);
  }, []);

  // Navigate to the previous page in history
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={handleGoBack}
        className={`flex items-center justify-center p-4 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition-all duration-500 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-opacity-50 ${
          isFloating ? 'translate-y-1' : 'translate-y-0'
        }`}
        aria-label="Go back"
      >
        <ArrowLeft className="mr-2" size={20} />
        <span className="font-medium">Back</span>
      </button>
    </div>
  );
};

export default FloatingBackButton;