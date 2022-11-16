import React, {useState} from 'react';
import styles from './ScrollUpButton.module.scss';


const ScrollUpButton = () => {
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
        <button className={styles.upBtn} style={{ display: visible ? 'inline' : 'none' }} onClick={scrollToTop}></button>
    );
};

export default ScrollUpButton;