"use client";
// SparkSpreadCalculator.js

import React, { useState, useEffect } from 'react';
import MenuBar from '@/components/Menu';
import TopBar from '@/components/Topbar';
import FieldSelector from '@/components/Select';
import SparkSpreadGraph from '@/components/SparkSpreadGraph';
import { info } from '@/constants';
import blackScholes from "@/components/Formular";

const SparkSpreadCalculator = () => {
    const [electricityPrice, setElectricityPrice] = useState('');
    const [fuelPrice, setFuelPrice] = useState('');
    const [strikePrice, setStrikePrice] = useState('');
    const [timeToMaturity, setTimeToMaturity] = useState('');
    const [volatility, setVolatility] = useState('');
    const [riskFreeRate, setRiskFreeRate] = useState('');
    const [sparkSpread, setSparkSpread] = useState(null);
    const [showGraph, setShowGraph] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [optimizedPrices, setOptimizedPrices] = useState(null);
    const [estimatedPerformance, setEstimatedPerformance] = useState(null);

    useEffect(() => {
        if (selectedField && optimizedPrices) {
            const optimizedPerformance = calculateEstimatedPerformance(optimizedPrices);
            setEstimatedPerformance(optimizedPerformance);
        }
    }, [selectedField, optimizedPrices]);

    const calculateSparkSpread = () => {
        const electricityPriceFloat = parseFloat(electricityPrice);
        const fuelPriceFloat = parseFloat(fuelPrice);
        const strikePriceFloat = parseFloat(strikePrice);
        const time = parseFloat(timeToMaturity);
        const vol = parseFloat(volatility) / 100;
        const r = parseFloat(riskFreeRate) / 100;

        if (isNaN(electricityPriceFloat) || isNaN(fuelPriceFloat) || isNaN(strikePriceFloat) || isNaN(time) || isNaN(vol) || isNaN(r)) {
            alert('Please enter valid numbers for all input fields.');
            return;
        }

        const calculatedSparkSpread = blackScholes(electricityPriceFloat, strikePriceFloat, time, vol, r);
        setSparkSpread(calculatedSparkSpread);
    };

    const handleViewGraph = () => {
        setShowGraph(true);
    };

    const handleOptimize = () => {
        if (!selectedField) {
            alert('Please select a field first.');
            return;
        }

        const optimized = info.map(item => {
            return {
                ...item,
                [selectedField]: item[selectedField] * 0.9,
            };
        });

        setOptimizedPrices(optimized);
    };

    const calculateEstimatedPerformance = (data) => {
        const filteredData = data.filter(item => item.used === selectedField);
    
        const totalElectricityPrice = filteredData.reduce((acc, item) => acc + item.electricityPrice, 0);
        const averageElectricityPrice = totalElectricityPrice / filteredData.length;
    
        const totalEfficiency = filteredData.reduce((acc, item) => acc + item.powerPlantEfficiency, 0);
        const averageEfficiency = totalEfficiency / filteredData.length;
    
        const estimatedPerformance = averageElectricityPrice * averageEfficiency;
    
        return estimatedPerformance;
    };
    
    return (
        <>
            <TopBar />
            <MenuBar />
            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
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
                <div className="mb-4">
                    <label htmlFor="strikePrice" className="block text-gray-700 font-medium">Strike Price: </label>
                    <input
                        id="strikePrice"
                        type="number"
                        step="0.01"
                        className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1"
                        value={strikePrice}
                        onChange={(e) => setStrikePrice(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="timeToMaturity" className="block text-gray-700 font-medium">Time to Maturity (years): </label>
                    <input
                        id="timeToMaturity"
                        type="number"
                        step="0.01"
                        className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1"
                        value={timeToMaturity}
                        onChange={(e) => setTimeToMaturity(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="volatility" className="block text-gray-700 font-medium">Volatility (%): </label>
                    <input
                        id="volatility"
                        type="number"
                        step="0.01"
                        className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1"
                        value={volatility}
                        onChange={(e) => setVolatility(e.target.value)}
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="riskFreeRate" className="block text-gray-700 font-medium">Risk-free Rate (%): </label>
                    <input
                        id="riskFreeRate"
                        type="number"
                        step="0.01"
                        className="w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1"
                        value={riskFreeRate}
                        onChange={(e) => setRiskFreeRate(e.target.value)}
                    />
                </div>

                {sparkSpread !== null && (
                    <div className="mb-4">
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
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-8 mb-4"
                    onClick={calculateSparkSpread}
                >
                    Calculate Spark Spread
                </button>

                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md ml-4 mb-4"
                    onClick={handleViewGraph}
                >
                    View Graph
                </button>

                {showGraph && (
                    <SparkSpreadGraph
                        electricityPrice={parseFloat(electricityPrice)}
                        fuelPrice={parseFloat(fuelPrice)}
                        sparkSpreadData={parseFloat(sparkSpread)}
                        selectedField={selectedField}
                        optimizedPrices={optimizedPrices}
                    />
                )}
                <div className="flex justify-between items-center mb-4 mt-8">
                    <FieldSelector
                        onSelect={(field) => {
                            setSelectedField(field);
                            setEstimatedPerformance(null);
                        }}
                    />
                    <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-4 mb-4"
                        onClick={handleOptimize}
                    >
                        Optimize
                    </button>
                </div>

                {estimatedPerformance !== null && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Estimated Power Performance:</h2>
                        <p className="text-gray-800">Based on optimization, the estimated power performance for this period is approximately ${estimatedPerformance.toFixed(2)} per MWh.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default SparkSpreadCalculator;

