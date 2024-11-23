// components/SortDropdown.js
import React from 'react';

export const SortDropdown = ({ value, onChange }) => {
    return (
        <select
            value={`${sortBy}:${sortDir}`}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border p-2 rounded-md w-[180px]"
        >
            <option value="id:DESC">최신순</option>
            <option value="rating:DESC">별점순</option>
        </select>
    );
};