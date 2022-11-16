import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import styles from "./ActionButton.module.scss";
import { FaTelegram } from "react-icons/fa";

const ActionButton = ({children, onClick, id = ''}) => {
    

    // useEffect(() => {
        
    // }, [category, orders, cuttingFiles]);

      return (
        <button className={styles.button} onClick={onClick} id={id}>
          {children}
        </button>
      );
};

export default ActionButton;