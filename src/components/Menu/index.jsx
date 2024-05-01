"use client";
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from "next/link"

const MenuBar = () => {

  return (
    <div className="fixed top-4 left-4 z-50">
      <GiHamburgerMenu
        className="w-8 h-8 text-black"
        style={{ fontSize: '20px' }} // Adjust the font size as needed
      />

      <div
        className={`fixed top-0 left-0 w-56 h-full bg-blue-500 shadow-md transition-transform duration-300 ease-in-out translate-x-0`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg mb-4 mx-4 font-bold text-gray-800 mr-auto">
            Home
          </Link>
        </div>
        <div className="py-4 text-gray-500">
          <ul className="mt-6 text-gray-800">
            <li
              className={`relative px-6 py-3 mt-4 hover:bg-white hover:text-gray-600 transition-colors duration-500`}
            >
              <span
                className={`absolute inset-y-0 left-0 w-1 bg-white rounded-tr-lg rounded-br-lg`}
              />
              <Link
                href="/noHedge"
                className="inline-flex items-center w-full text-sm font-semibold"
              >
                <span className="ml-4">No Hedging</span>
              </Link>
            </li>
           
            <li
              className={`relative px-6 py-3 mt-4 hover:bg-white hover:text-gray-600 transition-colors duration-500`}
            >
              <span
                className={`absolute inset-y-0 left-0 w-1 bg-white rounded-tr-lg rounded-br-lg`}
              />
              <Link
                href="/hedgeRatio"
                className="inline-flex items-center w-full text-sm font-semibold"
              >
                <span className="ml-4">Hedge Ratio</span>
              </Link>
            </li>

            <li
              className={`relative px-6 py-3 mt-4 hover:bg-white hover:text-gray-600 transition-colors duration-500`}
            >
              <span
                className={`absolute inset-y-0 left-0 w-1 bg-white rounded-tr-lg rounded-br-lg`}
              />
              <Link
                href="/sparkSpread"
                className="inline-flex items-center w-full text-sm font-semibold"
              >
                <span className="ml-4">Spark Spread</span>
              </Link>
            </li>
            <li
              className={`relative px-6 py-3 mt-4 hover:bg-white hover:text-gray-600 transition-colors duration-500`}
            >
              <span
                className={`absolute inset-y-0 left-0 w-1 bg-white rounded-tr-lg rounded-br-lg`}
              />
              <Link
                href="/optimization"
                className="inline-flex items-center w-full text-sm font-semibold"
              >
                <span className="ml-4">History Information</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
