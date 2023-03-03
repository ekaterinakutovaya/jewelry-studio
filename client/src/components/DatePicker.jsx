import React from 'react';

export const DatePicker = ({value, onChange}) => {
    return (
            <input type="date" 
            className="h-11 sm:h-14 md:h-auto relative min-w-[140px] sm:min-w-[170px] md:min-w-[120px] lg:min-w-[110px] cursor-default rounded-md border border-gray-300 bg-white py-2 text-center shadow-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 text-sm sm:text-base md:text-xs xl:text-sm"
            value={value}
            onChange={onChange}
            />
    );
};