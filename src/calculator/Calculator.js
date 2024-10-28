// src/Calculator.js
import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const isValidInput = (value) => {

    const invalidPatterns = [
      /\*\*/,    // ** 
      /\*\/|\/\*/,  // */ hoặc /* 
      /\+\*/g,   // +* 
      /\-\*/g,   // -* 
      /\*\+/g,   // *+ 
      /\/\//,    // //
      /\-\//,    // -/ 
      /\+\//,    // +/ 
      /\/\+/g,   // /+ 
      /\+\+/g,   // ++
      /\-\-/g,    // --
      /\-\+/g
    ];
    
    return !invalidPatterns.some((pattern) => pattern.test(value));
  };

  const handleButtonClick = (value) => {

    if (result) {
      setInput(value);
      setResult('');
    } else {
      const newInput = input + value;


     if(isValidInput(newInput)) {
        setInput(newInput)
     }        
    }
  };

  const handleSquare = () => {
    try {
        if (input) {
          const evaluatedResult = eval(input);
          const squared = evaluatedResult * evaluatedResult;
          setResult(squared);
          setInput('');
        } else if (result) {
          const squared = result * result;
          setResult(squared);
        }
      } catch (error) {
        setResult('Error');
      }
  };

  const handleSquareRoot = () => {
    const num = parseFloat(input);
    try {
      if (!isNaN(num) && num >= 0) {
        setResult(Math.sqrt(num).toFixed(2));
        setInput("");
      } else if(result){
        setResult(Math.sqrt(result).toFixed(2));
        setInput("");

      }
    } catch (error) {
      setResult("Error");
    }
  };

  const calculateResult = () => {
    try {
        const evaluatedResult = eval(input); 
        setResult(evaluatedResult);
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="max-w-xs mt-7 mx-auto bg-white p-6 rounded-lg shadow-lg">
  <div className="flex flex-col mb-4">
    <div className="border border-gray-300 p-4 text-right text-3xl bg-gray-100 rounded-md overflow-x-auto whitespace-nowrap text-ellipsis">{input}</div>
    <div className="border border-gray-300 p-4 text-right text-2xl text-gray-600 bg-gray-200 rounded-md overflow-x-auto whitespace-nowrap text-ellipsis">{result}</div>
  </div>
  <div className="grid grid-cols-4 gap-4">
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleButtonClick('1')}>1</button>
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleButtonClick('2')}>2</button>
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleButtonClick('3')}>3</button>
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleButtonClick('+')}>+</button>
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleButtonClick('4')}>4</button>
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleButtonClick('5')}>5</button>
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleButtonClick('6')}>6</button>
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleButtonClick('-')}>-</button>
    
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleButtonClick('7')}>7</button>
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleButtonClick('8')}>8</button>
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleButtonClick('9')}>9</button>
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleButtonClick('*')}>*</button>
    
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleButtonClick('0')}>0</button>
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleSquareRoot()}>√</button>
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleSquare()}>x²</button>
    <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => handleButtonClick('/')}>÷</button>

    <button className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200 col-span-2" onClick={calculateResult}>=</button>
    <button className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-200" onClick={clearInput}>C</button>
  </div>
</div>

  
  );
};

export default Calculator;
