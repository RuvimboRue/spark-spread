"use client";
import MenuBar from '@/components/Menu';
import TopBar from '@/components/Topbar';
import { useState, useRef } from 'react';
import NoHedgeGraph from '@/components/NoHedgeGraph'; // Import your graph component

const NoHedge = () => {
  const [gasPrice, setGasPrice] = useState('');
  const [electricityPrice, setElectricityPrice] = useState('');
  const [result, setResult] = useState(null);
  const [showGraph, setShowGraph] = useState(false); // State to control visibility of graph
  const chartRef = useRef(null); 

  const handleCalculate = () => {
    const gas = parseFloat(gasPrice);
    const electricity = parseFloat(electricityPrice);

    // Check if both gas and electricity prices are valid numbers
    if (!isNaN(gas) && !isNaN(electricity)) {
      // Calculate the result
      const calculatedResult = electricity - gas;
      setResult(calculatedResult.toFixed(2)); // Round to 2 decimal places
    } else {
      // If any of the input fields are not valid numbers, set result to null
      setResult(null);
    }
  };

  const handleViewGraph = () => {
    setShowGraph(true); // Set showGraph state to true to display the graph
  };

  return (
    <>
    <TopBar/>
    <MenuBar/>
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
      <h1 className="text-xl font-semibold mb-4">Spark Spread(No Hedging)</h1>
      <div className="mb-4">
        <label htmlFor="gasPrice" className="block text-gray-700 font-medium">Gas Price ($)</label>
        <input
          id="gasPrice"
          type="number"
          step="0.01"
          className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-4"
          value={gasPrice}
          onChange={(e) => setGasPrice(e.target.value)}
        />
      </div>
      <div className="mb-8">
        <label htmlFor="electricityPrice" className="block text-gray-700 font-medium mt-8">Electricity Price ($)</label>
        <input
          id="electricityPrice"
          type="number"
          step="0.01"
          className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-4"
          value={electricityPrice}
          onChange={(e) => setElectricityPrice(e.target.value)}
        />
      </div>
      
      {result !== null && (
        <div className="mt-4">
          <label htmlFor="result" className="block text-gray-700 font-medium">Spark Spread($)</label>
          <input
            id="result"
            type="text"
            className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1 mb-4"
            readOnly
            value={result}
          />
        </div>
      )}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-8"
        onClick={handleCalculate}
      >
        Calculate
      </button>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md ml-4"
        onClick={handleViewGraph}
      >
        View Graph
      </button>

    </div>
    {showGraph && (
      <div>
        <NoHedgeGraph gasPrice={gasPrice} electricityPrice={electricityPrice} />
      </div>
    )}
    </>
  );
};

export default NoHedge;
