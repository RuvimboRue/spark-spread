"use client";
import React from 'react';
import { info } from '@/constants';

const FieldSelector = ({ fields = [], onSelect }) => {
  const handleFieldSelection = (e) => {
    const contractName = e.target.value;
    onSelect(contractName); // Pass the selected field directly
  };

  return (
    <div>
      <label htmlFor="fieldSelection" className="text-gray-700 font-medium">
        Utility Used:
      </label>
      <select onChange={handleFieldSelection} id="fieldSelection">
        <option value=""></option>
          <option className='w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1'>
            Electricity
          </option>
          <option className='w-full border-gray-300 bg-gray-100 py-1 rounded-md mt-1'>
            Natural Gas
          </option>
      </select>
    </div>
  );
};

export default FieldSelector;
