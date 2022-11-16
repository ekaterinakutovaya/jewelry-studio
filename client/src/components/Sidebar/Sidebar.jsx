import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTools, FaRegGem, FaDollarSign, FaCogs } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { useMediaQuery } from "react-responsive";

import { setSideBarVisible } from "store/SidebarSlice";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sideBarVisible } = useSelector(state => state.sidebar);
  const [visible, setVisible] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  let activeClassName = styles.active;
  let collapsedClassName = styles.collapsed;
  
  useEffect(() => {
    if (isTabletOrMobile) {
      setVisible(false);
      dispatch(setSideBarVisible(false));
    } else {
      setVisible(true);
      dispatch(setSideBarVisible(true));
    }
  }, [isTabletOrMobile])

  useEffect(() => {
    setVisible(sideBarVisible);
  }, [sideBarVisible])

  const handleClose = () => {
    setVisible(false);
    dispatch(setSideBarVisible(false));
  }

  return (
    <aside className={visible ? styles.sidebar : `${styles.sidebar} ${collapsedClassName}`}>
      <GrClose 
      className={styles.close} 
        onClick={handleClose}
      />
      <div className={styles.inner}>
        <div className={styles.list}>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive
                ? `${styles.linkWorkshop} ${activeClassName}`
                : `${styles.linkWorkshop}`
            }
          >
            Мастерская
          </NavLink>

          <NavLink
            to="/prices"
            className={({ isActive }) =>
              isActive
                ? `${styles.linkPrices} ${activeClassName}`
                : `${styles.linkPrices}`
            }
          >
            Цены
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
