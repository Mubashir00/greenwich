import React, { useState } from 'react';
import { Operation } from '../types';
import Button from './Button';

const Calculator: React.FC = () => {
  // State to hold the two input numbers as strings (better for handling empty inputs)
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  
  // State for the calculated result and any error messages
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Track the last selected operation for visual feedback
  const [selectedOp, setSelectedOp] = useState<Operation | null>(null);

  // Helper function to validate inputs
  const getNumbers = (): { n1: number; n2: number } | null => {
    // Check if inputs are empty
    if (num1.trim() === '' || num2.trim() === '') {
      setError('Please enter both numbers');
      setResult(null);
      return null;
    }

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    // Check if inputs are valid numbers
    if (isNaN(n1) || isNaN(n2)) {
      setError('Invalid number format');
      setResult(null);
      return null;
    }

    return { n1, n2 };
  };

  // Main calculation handler
  const calculate = (op: Operation) => {
    setError(null);
    setSelectedOp(op);
    
    const nums = getNumbers();
    if (!nums) return;

    const { n1, n2 } = nums;
    let res: number = 0;

    // Perform the arithmetic based on the operation
    switch (op) {
      case Operation.Add:
        res = n1 + n2;
        break;
      case Operation.Subtract:
        res = n1 - n2;
        break;
      case Operation.Multiply:
        res = n1 * n2;
        break;
      case Operation.Divide:
        // Handle division by zero
        if (n2 === 0) {
          setError('Cannot divide by zero');
          setResult(null);
          return;
        }
        res = n1 / n2;
        break;
    }

    // Limit decimal places for display neatness if result is a float
    setResult(parseFloat(res.toFixed(4)));
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="num1" className="text-sm font-medium text-gray-600">First Number</label>
          <input
            id="num1"
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Enter a number"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="num2" className="text-sm font-medium text-gray-600">Second Number</label>
          <input
            id="num2"
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Enter a number"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Operations Section */}
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-600 mb-3">Choose Operation</p>
        <div className="grid grid-cols-4 gap-3">
          <Button 
            label="+" 
            onClick={() => calculate(Operation.Add)} 
            isActive={selectedOp === Operation.Add}
            className="text-2xl"
          />
          <Button 
            label="-" 
            onClick={() => calculate(Operation.Subtract)} 
            isActive={selectedOp === Operation.Subtract}
             className="text-2xl"
          />
          <Button 
            label="×" 
            onClick={() => calculate(Operation.Multiply)} 
            isActive={selectedOp === Operation.Multiply}
             className="text-2xl"
          />
          <Button 
            label="÷" 
            onClick={() => calculate(Operation.Divide)} 
            isActive={selectedOp === Operation.Divide}
             className="text-2xl"
          />
        </div>
      </div>

      {/* Result & Error Display Section */}
      <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100 min-h-[120px] flex flex-col items-center justify-center">
        {error ? (
          <div className="flex items-center gap-2 text-red-500 animate-pulse">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        ) : result !== null ? (
          <div className="animate-in fade-in zoom-in duration-300">
            <span className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Result</span>
            <div className="text-5xl font-bold text-gray-800 mt-2 break-all">
              {result}
            </div>
          </div>
        ) : (
          <span className="text-gray-400">Result will appear here</span>
        )}
      </div>
      
      {/* Reset Button */}
      {(result !== null || error || num1 || num2) && (
        <button
          onClick={() => {
            setNum1('');
            setNum2('');
            setResult(null);
            setError(null);
            setSelectedOp(null);
          }}
          className="mt-6 w-full py-2 text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default Calculator;