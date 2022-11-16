import React, { useEffect, useState} from 'react';
import { NavLink, useNavigate } from "react-router-dom";

import classNames from "classnames";
import Hamburger from "hamburger-react";
import { useMediaQuery } from "react-responsive";
import DropdownMenu from "../UI/DropdownMenu/DropdownMenu";
import { FaBars } from "react-icons/fa";
import { FaTelegram, FaInstagram } from "react-icons/fa";

import { IoIosLogIn, IoIosLogOut, IoIosMenu } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/AuthSlice";
import { setSideBarVisible } from "../../store/SidebarSlice";

import styles from "./Header.module.scss";


const Header = () => {
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const { sideBarVisible } = useSelector(state => state.sidebar);
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  // const [isOpen, setOpen] = useState(false);
  const [sideBar, setSideBar] = useState(false);

  useEffect(() => {
    setSideBar(sideBarVisible);
  }, [sideBarVisible])

  const openMenu = () => {
    setSideBar(true);
    dispatch(setSideBarVisible(true));
  }

  const logOut = () => {
    dispatch(logout());
  };

    return (
      <header className={styles.header}>
        <div className={styles.inner}>
          <nav className={styles.navbar}>
            {isLoggedIn ? (
              <>
                <IoIosMenu className={styles.menu} onClick={openMenu}/>
                <p className={styles.welcome}>Hello, {user.username}!</p>
                <button
                  className={styles.login}
                  onClick={logOut}
                >
                  <IoIosLogOut className={styles.IoIosLogIn} />
                </button>
              </>
            ) : (
              ""
            )}
          </nav>
        </div>
      </header>
    );
};

export default Header;