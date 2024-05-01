import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SparkSpreadGraph = ({ electricityPrice, fuelPrice, sparkSpreadData }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [`Electricity Price: ${electricityPrice}`, `Gas Price: ${fuelPrice}`, 'Spark Spread'],
                datasets: [{
                    label: 'Prices',
                    data: [electricityPrice, fuelPrice, sparkSpreadData],
                    backgroundColor: ['#007BFF', '#28A745', '#FFA500'], // Blue for electricity, green for gas, orange for spark spread
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }, [electricityPrice, fuelPrice, sparkSpreadData]);

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-semibold mb-4">Spark Spread Graph</h1>
            <canvas id="sparkSpreadChart" ref={chartRef}></canvas>
        </div>
    );
};

export default SparkSpreadGraph;
