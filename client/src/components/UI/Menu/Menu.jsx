import React from 'react';
import { NavLink } from "react-router-dom";

import styles from "./Menu.module.scss";

const Menu = () => {
    return (
        <nav className={styles.menu}>
            <NavLink
                to="/orders"
            >
                Мастерская
            </NavLink>

            <NavLink
                to="/prices"
            >
                Цены
            </NavLink>
        </nav>
    );
};

export default Menu;