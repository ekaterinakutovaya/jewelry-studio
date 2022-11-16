import React, {useState} from "react";
import styles from "./DropdownMenu.module.scss";
// import { FaTimes } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";



const DropdownMenu = ({ items }) => {

   
  return (
    <div className={styles.menu}>
      <div className={styles.menuContent}>
        {/* <div className={styles.closeWrapper}>
            <AiOutlineClose className={styles.close} />
        </div> */}
        <ul>
          {items.map((item, index) => (
            <li key={index} className={styles.item}>
              <a href={item.href}>{item.value}</a>
              {/* <span className="material-icons">{item.icon}</span> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
