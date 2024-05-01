import React from 'react';
import { info } from '@/constants';

const DataTable = () => {
  return (
    <div className="overflow-x-auto mx-auto">
      <table className="w-full table-auto mx-auto">
        <thead>
          <tr>
            {/* Render table headers for each field with Tailwind CSS classes */}
            {/* <th className="px-4 py-2">Contract Name</th> */}
            <th className="px-4 py-2 whitespace-nowrap">Date Range</th>
            <th className="px-4 py-2">Last Electricity Price</th>
            <th className="px-4 py-2">Last Natural Gas Price</th>
            <th className="px-4 py-2">Energy Used</th>
            <th className="px-4 py-2">Power Plant Efficiency</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over each data row and render table cells */}
          {info.map((field, index) => (
            <tr key={index}>
              {/* <td className="border px-4 py-2">{field.source}</td> */}
              <td className="border px-4 py-2 whitespace-nowrap">{field.date}</td>
              <td className="border px-4 py-2">{field.electricityPrice}</td>
              <td className="border px-4 py-2">{field.naturalGasPrice}</td>
              <td className="border px-4 py-2">{field.used}</td>
              <td className="border px-4 py-2">{field.powerPlantEfficiency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
