import React, { useState, useEffect } from 'react';

// Checkboxes must behave like radio buttons
// It must be selected or one of two or none

export const UrgencyCheckbox = ({ urgencyIndex, setUrgencyIndex }) => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false); 
    

    useEffect(() => {        
        switch (urgencyIndex) {
            case 0:
                setChecked1(!checked1);
                break;
            case 1:
                setChecked2(!checked2);
                break;
        }
    }, []);

    const handleCheckbox1 = e => {
        setUrgencyIndex(2);
        
        setChecked1(!checked1);
        setChecked2(false);

        if (!checked1 == true) {
            setUrgencyIndex(prevState => (prevState = 0));
        }
    };
    const handleCheckbox2 = e => {
        setUrgencyIndex(2);

        setChecked2(!checked2);
        setChecked1(false);

        if (!checked2 == true) {
            setUrgencyIndex(prevState => (prevState = 1));
        }
    };

    return (
        <div className="flex flex-col justify-evenly">
            <div className="flex items-center mb-4 md:mb-2">
                <input
                    id="checked2"
                    checked={checked2}
                    onChange={handleCheckbox2}
                    name="urgency"
                    type="checkbox"
                    className="h-6 md:h-4 w-6 md:w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 md:cursor-pointer"
                />
                <label htmlFor="checked2" className="ml-2 block text-sm lg:text-xs xl:text-sm text-gray-900 select-none md:cursor-pointer">
                    Срочный
                </label>
            </div>

            <div className="flex items-center">
                <input
                    id="checked1"
                    checked={checked1}
                    onChange={handleCheckbox1}
                    name="urgency"
                    type="checkbox"
                    className="h-6 md:h-4 w-6 md:w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 md:cursor-pointer"
                />
                <label htmlFor="checked1" className="ml-2 block text-sm lg:text-xs xl:text-sm text-gray-900 select-none md:cursor-pointer">
                    Очень срочный
                </label>
            </div>
        </div>
    );
};
