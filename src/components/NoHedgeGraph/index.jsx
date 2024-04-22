import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const NoHedgeGraph = ({ gasPrice, electricityPrice }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
  
    useEffect(() => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
  
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Gas Price', 'Electricity Price'],
            datasets: [
              {
                label: 'Price ($)',
                data: [parseFloat(gasPrice) || 0, parseFloat(electricityPrice) || 0],
                backgroundColor: ['#FF7A00', '#007BFF'],
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }, [gasPrice, electricityPrice]);
  
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-4">Gas vs Electricity Price Graph</h1>
        <canvas ref={chartRef}></canvas>
      </div>
    );
  };

export default NoHedgeGraph;
