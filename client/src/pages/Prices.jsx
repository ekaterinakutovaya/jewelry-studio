import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Diamonds, Metall } from "@/components";


export const Prices = () => {
    const { prices } = useSelector(state => state.prices);
    const [metall, setMetall] = useState([]);
    const [diamonds, setDiamonds] = useState([]);

    useEffect(() => {
        document.title = `Цены`;
    }, [])

    useEffect(() => {
        prices && prices.map(item => {
            if (item.hallmark) {
                setMetall(prevState => [...prevState, item]);
            }
            if (item.diamondSize) {
                setDiamonds(prevState => [...prevState, item]);
            }
        })

        return () => {
            setMetall([]);
            setDiamonds([]);
        }
    }, [prices])


    return (
        <div className="container py-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 my-0 mx-auto">
            <div className="">
                    <label htmlFor="" className="block text-base font-medium text-gray-700 mb-2" >
                        Металл
                    </label>
                    <Metall prices={metall} />
                </div>
                
                <div className="">
                    <label htmlFor="" className="block text-base font-medium text-gray-700 mb-2" >
                        Бриллианты
                    </label>
                    <Diamonds prices={diamonds} />
                </div>
            </div>
        </div>
    );
};

