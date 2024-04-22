"use client";
import MenuBar from '@/components/Menu';
import TopBar from '@/components/Topbar';
import { useState } from 'react';
import SparkSpreadGraph from '@/components/SparkSpreadGraph'; // Importing the SparkSpreadGraph component

const SparkSpreadCalculator = () => {
    const [electricityPrice, setElectricityPrice] = useState('');
    const [fuelPrice, setFuelPrice] = useState('');
    const [heatRate, setHeatRate] = useState('');
    const [sparkSpread, setSparkSpread] = useState(null);
    const [showGraph, setShowGraph] = useState(false); // State to control graph visibility

    const calculateSparkSpread = () => {
        const electricityPriceFloat = parseFloat(electricityPrice);
        const fuelPriceFloat = parseFloat(fuelPrice);
        const heatRateFloat = parseFloat(heatRate);

        if (isNaN(electricityPriceFloat) || isNaN(fuelPriceFloat) || isNaN(heatRateFloat)) {
            alert('Please enter valid numbers for all input fields.');
            return;
        }

        const calculatedSparkSpread = electricityPriceFloat - (fuelPriceFloat * heatRateFloat);
        setSparkSpread(calculatedSparkSpread.toFixed(2)); // Round to 2 decimal places
    };

    const handleViewGraph = () => {
        setShowGraph(true);
    };

    return (
        <>
            <TopBar />
            <MenuBar />
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
                <h1 className="text-xl font-semibold mb-4">Spark Spread Calculator</h1>
                <div className="mb-4">
                    <label htmlFor="electricityPrice" className="block text-gray-700 font-medium">Electricity Price: </label>
                    <input
                        id="electricityPrice"
                        type="number"
                        step="0.01"
                        className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1"
                        value={electricityPrice}
                        onChange={(e) => setElectricityPrice(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="fuelPrice" className="block text-gray-700 font-medium">Gas Price: </label>
                    <input
                        id="fuelPrice"
                        type="number"
                        step="0.01"
                        className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1"
                        value={fuelPrice}
                        onChange={(e) => setFuelPrice(e.target.value)}
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="heatRate" className="block text-gray-700 font-medium">Hedge Ratio: </label>
                    <input
                        id="heatRate"
                        type="number"
                        step="0.01"
                        className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1"
                        value={heatRate}
                        onChange={(e) => setHeatRate(e.target.value)}
                    />
                </div>

                {sparkSpread !== null && (
                    <div className="mt-4">
                        <label htmlFor="sparkSpread" className="block text-gray-700 font-medium">Spark Spread ($/MWh): </label>
                        <input
                            id="sparkSpread"
                            type="text"
                            className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1"
                            readOnly
                            value={sparkSpread}
                        />
                    </div>
                )}

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-8"
                    onClick={calculateSparkSpread}
                >
                    Calculate Spark Spread
                </button>

                {/* Button to view graph */}
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md ml-4"
                    onClick={handleViewGraph}
                >
                    View Graph
                </button>

                {/* Display the graph if showGraph state is true */}
                {showGraph && <SparkSpreadGraph sparkSpreadData={parseFloat(sparkSpread)} />}
            </div>
        </>
    );
};

export default SparkSpreadCalculator;

