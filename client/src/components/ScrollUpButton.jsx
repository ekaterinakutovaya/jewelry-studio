import {useState} from 'react';
import { IoChevronUpCircle } from "react-icons/io5";

export const ScrollUpButton = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        }
        else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <button
            style={{ display: visible ? 'inline' : 'none' }}
            className="flex items-center justify-center w-16 h-16 opacity-20 hover:opacity-70 fixed bottom-6 right-8 cursor-pointer text-purple-600 text-6xl transition" 
        onClick={scrollToTop}
        >
            <IoChevronUpCircle className=""/>
        </button>
    );
};
