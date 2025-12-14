// Define the available arithmetic operations as an Enum for type safety
export enum Operation {
  Add = '+',
  Subtract = '-',
  Multiply = '×',
  Divide = '÷',
}

// Interface for the calculator's state
export interface CalculatorState {
  num1: string;
  num2: string;
  result: number | null;
  error: string | null;
  selectedOperation: Operation | null;
}