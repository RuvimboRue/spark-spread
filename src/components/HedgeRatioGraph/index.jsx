"use client";
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HedgeRatioGraph = ({ hedgeRatioData }) => {
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
        labels: ['Hedge Ratio'],
        datasets: [{
          label: 'Hedge Ratio',
          data: [hedgeRatioData],
          backgroundColor: ['#007BFF'],
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
  }, [hedgeRatioData]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-4">Hedge Ratio Graph</h1>
      <canvas id="hedgeRatioChart" ref={chartRef}></canvas>
    </div>
  );
};

export default HedgeRatioGraph;

