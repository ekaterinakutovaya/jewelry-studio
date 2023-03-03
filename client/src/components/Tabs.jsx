import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { changeSelectedTab } from "@/store/FilterSlice";

export const Tabs = ({tabs, onClick}) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const { category } = useSelector(state => state.filter);

    const activeClassName = 'inline-flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-5 py-4 md:py-3 text-base md:text-sm font-medium text-white mr-2 md:mr-4 min-w-[120px] drop-shadow-lg cursor-pointer ';
    const idleClassName = 'inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-4 md:py-3 text-base md:text-sm font-medium text-purple-600 hover:bg-gray-50 mr-2 md:mr-4 min-w-[120px] drop-shadow-lg cursor-pointer';

    useEffect(() => {
        setActiveTab(category);
    }, [])

    const onSelectTab = (index) => {
        setActiveTab(index);
        dispatch(changeSelectedTab(index));
    };

    return (
        <div className="relative order-1 md:order-0 w-full sm:w-auto my-0 mx-auto sm:mx-0">
            <ul className="flex overflow-x-scroll sm:overflow-x-auto w-full sm:w-auto pb-4">
                {tabs &&
                    tabs.map((tab, index) =>
                        <li
                            key={tab.value}
                            className={activeTab === index ? activeClassName : idleClassName}
                            onClick={() => onSelectTab(index)}
                        >
                            {tab.label}
                        </li>
                    )
                }
            </ul>
        </div>
    );
};
