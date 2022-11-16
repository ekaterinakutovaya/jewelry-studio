import React from 'react';
import { FaTimes, FaSave, FaTrash } from "react-icons/fa";
import ActionButton from "../UI/Button/ActionButton";

import styles from './EditMode.module.scss';

const QuickEditBlock = ({ handleCancelClick, quickUpdateHandler, orderDeleteHandler }) => {
  
  return (
    <div className={styles.wrapper}>
      <ActionButton onClick={quickUpdateHandler}>
        <FaSave className={styles.save} />
      </ActionButton>

      <ActionButton
        onClick={() => { if (window.confirm('Удалить заказ?')) orderDeleteHandler()}}
      >
        <FaTrash className={styles.remove} />
      </ActionButton>
      <button className={styles.cancel} onClick={handleCancelClick}>
        <FaTimes />
      </button>
    </div>
  );
};

export default QuickEditBlock;