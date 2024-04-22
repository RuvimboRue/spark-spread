"use client";
import MenuBar from '@/components/Menu';
import TopBar from '@/components/Topbar';
import { useState , useRef} from 'react';

const HedgeRatioCalculator = () => {
  const [heatRate, setHeatRate] = useState('');
  const [electricityDelivered, setElectricityDelivered] = useState('');
  const [sizeOfFuelContract, setSizeOfFuelContract] = useState('');
  const [hedgeRatio, setHedgeRatio] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const chartRef = useRef(null); 

  const calculateHedgeRatio = () => {
    // Convert inputs to numbers
    const heatRateValue = parseFloat(heatRate);
    const electricityDeliveredValue = parseFloat(electricityDelivered);
    const sizeOfFuelContractValue = parseFloat(sizeOfFuelContract);

    // Validate inputs
    if (isNaN(heatRateValue) || isNaN(electricityDeliveredValue) || isNaN(sizeOfFuelContractValue)) {
      // If any input is not a valid number, set hedge ratio to null and return
      setHedgeRatio(null);
      return;
    }

    // Calculate hedge ratio
    const hedgeRatioValue = (heatRateValue / 1000) * (electricityDeliveredValue * 25 / sizeOfFuelContractValue);
    setHedgeRatio(hedgeRatioValue.toFixed(2)); // Round to 2 decimal places
  };
  const handleViewGraph = () => {
    setShowGraph(true);
    // Additional logic to update graph data if needed
  };

  return (
    <>
    <TopBar/>
    <MenuBar/>
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
      <h1 className="text-xl font-semibold mb-4">Hedge Ratio Calculator</h1>
      <div className="mb-4">
        <label htmlFor="heatRate" className="block text-gray-700 font-medium">Heat Rate of Power Plant</label>
        <input
          id="heatRate"
          type="number"
          step="0.01"
          className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1"
          value={heatRate}
          onChange={(e) => setHeatRate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="electricityDelivered" className="block text-gray-700 font-medium">Electricity Delivered in Month (MWh)</label>
        <input
          id="electricityDelivered"
          type="number"
          step="0.01"
          className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1"
          value={electricityDelivered}
          onChange={(e) => setElectricityDelivered(e.target.value)}
        />
      </div>
      <div className="mb-8">
        <label htmlFor="sizeOfFuelContract" className="block text-gray-700 font-medium">Size of Fuel Contract (million BTUs)</label>
        <input
          id="sizeOfFuelContract"
          type="number"
          step="0.01"
          className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1"
          value={sizeOfFuelContract}
          onChange={(e) => setSizeOfFuelContract(e.target.value)}
        />
      </div>

      {hedgeRatio !== null && (
        <div className="mt-4">
          <label htmlFor="hedgeRatioResult" className="block text-gray-700 font-medium">Hedge Ratio</label>
          <input
            id="hedgeRatioResult"
            type="text"
            className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1"
            readOnly
            value={hedgeRatio}
          />
        </div>
      )}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-8"
        onClick={calculateHedgeRatio}
      >
        Calculate
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md ml-4"
        onClick={handleViewGraph}
      >
        View Graph
      </button>

      {/* Graph component */}
      {showGraph && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Hedge Ratio Graph</h2>
          <div className="max-w-md mx-auto">
          <canvas id="hedgeRatioChart" ref={chartRef}></canvas>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default HedgeRatioCalculator;
