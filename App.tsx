import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    // Main container with a gradient background and centering
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md">
          React Calculator
        </h1>
        <Calculator />
        <p className="text-center text-white/70 mt-4 text-sm">
          Select an operation to calculate
        </p>
      </div>
    </div>
  );
};

export default App;