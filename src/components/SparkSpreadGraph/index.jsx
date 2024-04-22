// components/SparkSpreadGraph.js
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SparkSpreadGraph = ({ sparkSpreadData }) => {
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
                labels: ['Spark Spread'],
                datasets: [{
                    label: 'Spark Spread',
                    data: [sparkSpreadData],
                    backgroundColor: ['#FFA500'], // Orange color for spark spread
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
    }, [sparkSpreadData]);

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-semibold mb-4">Spark Spread Graph</h1>
            <canvas id="sparkSpreadChart" ref={chartRef}></canvas>
        </div>
    );
};

export default SparkSpreadGraph;
