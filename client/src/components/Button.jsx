import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import { Spinner } from '@/components';

export const Button = ({ onClick, type, children }) => {
    const btnClass = classNames({
        btn: true,
        "inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-sm font-medium text-purple-600 hover:bg-gray-50": type == "text",

        "inline-flex items-center justify-center rounded-md border border-transparent bg-white p-5 md:p-3 lg:p-2 xl:p-3 text-base md:text-sm font-medium text-purple-600 hover:bg-gray-50 mr-4e drop-shadow-lg xl:cursor-pointer": type == "icon",

        "inline-flex items-center justify-center rounded-md border border-transparent bg-white p-3 lg:p-2 xl:p-3 text-base sm:text-sm font-medium text-purple-600 hover:bg-gray-50 mr-4e drop-shadow-lg xl:cursor-pointer": type == "icon-sm",
        
        "inline-flex items-center justify-center rounded-md border-2 border-secondary bg-white px-5 py-4 md:py-3 test-base md:text-sm font-medium text-purple-600 hover:bg-gray-50 xss:w-full sm:max-w-xs md:w-auto": type == "light",

        "inline-flex items-center justify-center rounded-md border-2 border-transparent bg-purple-600 px-5 py-4 md:py-3 test-base md:text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 xss:w-full sm:max-w-xs md:w-full transition-spacing duration-700": type == "dark",
    });


    return (
        <button
            type="submit"
            className={btnClass}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
