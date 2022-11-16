import React from "react";
import styles from "./Logo.module.scss";
import { NavLink } from "react-router-dom";
import Mozaic from "../../static/icons/Mozaic";


const Logo = () => {
  return (
    <NavLink to="/" className="logo__link">
      <div className={styles.logo}>
        <div className={styles.titleWrapper}>
          <p className={styles.title}>Yuliya</p>
        </div>
        <svg className="logoIcon">
          <use xlinkHref="#mozaic" />
        </svg>
        <Mozaic />

        <div className={styles.titleWrapper}>
          <p className={styles.title}>Kutovaya</p>
        </div>
      </div>
    </NavLink>
  );
};

export default Logo;
