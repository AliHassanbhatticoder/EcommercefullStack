"use client";

import React, { useState } from "react";

const SortFilter: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSorting, setShowSorting] = useState(false);

  return (
    <div>
      <div className="px-4 py-4 border-t border-b border-gray-300 text-gray-800 text-sm">
        {/* Mobile View */}
        <div className="flex justify-between items-center sm:hidden">
          {/* Filters Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-100 px-4 py-2 rounded-md"
          >
            Filters ▼
          </button>

          {/* Sorting Button */}
          <button
            onClick={() => setShowSorting(!showSorting)}
            className="bg-gray-100 px-4 py-2 rounded-md"
          >
            Sorting ▼
          </button>
        </div>
        {/* Filters Dropdown (Mobile) */}
        {showFilters && (
          <div className="mt-4 space-y-2 sm:hidden">
            {/* ... (your filter options here) */}
            {/* Example: */}
            <div>
              <label htmlFor="category">Category:</label> <br />
              <select id="category" className="block w-full border p-2 rounded">
                <option>All</option>
                <option>Electronics</option>
                <option>Clothing</option>
              </select>
            </div>
            {/* ... more filter options */}
            {/* Important: Correct select input structure and options */}
          </div>
        )}

        {/* Sorting Dropdown (Mobile) */}
        {showSorting && (
          <div className="mt-4 sm:hidden">
            <label htmlFor="sorting">Sorting by:</label>
            <select id="sorting" className="block w-full border p-2 rounded">
              <option>Date added</option>
              <option>Price (low to high)</option>
              <option>Price (high to low)</option>
            </select>
          </div>
        )}

        {/* Desktop View */}
        <div className="hidden sm:flex justify-between items-center">
          {/* ... (your desktop view filter and sorting options) */}
          {/* Example:  (Structure as in mobile view)*/}
          <div>
            <label htmlFor="desktop-category">Category:</label> <br />
            <select
              id="desktop-category"
              className="block w-full border p-2 rounded"
            >
              <option>All</option>
              <option>Electronics</option>
              {/* ... */}
            </select>
          </div>
          {/* ... more filter options  */}
          {/* Note: Use proper label htmlFor attributes and ensure correct formatting */}
        </div>
      </div>
    </div>
  );
};

export default SortFilter;
