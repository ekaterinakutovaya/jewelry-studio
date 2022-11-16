import React from "react";
import styles from "./Footer.module.scss";
import Logo from "../Logo/Logo";
import { NavLink, Link } from "react-router-dom";

import { FaTelegram, FaInstagram } from "react-icons/fa";
import Telegram from "../../static/icons/Telegram";
import Instagram from "../../static/icons/Instagram";



const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          <div className="d-flex justify-content-center">
            <Logo />
          </div>
          <div className={styles.inner}>
            <div className={styles.social}>
              <a
                target="_blank"
                href="https://www.instagram.com/yuliya_kutovaya_jewelry/"
              >
                {/* <FaInstagram className={styles.instagram} /> */}
                <svg className={styles.instagramIcon}>
                  <use xlinkHref="#instagram" />
                </svg>
                <Instagram />
              </a>
              <a target="_blank" href="https://t.me/yuliya_kutovaya_jewelry">
                {/* <FaTelegram className={styles.instagram} /> */}
                <svg className={styles.telegramIcon}>
                  <use xlinkHref="#telegram" />
                </svg>
                <Telegram />
              </a>
              {/* <a href="/about" className={styles.about}>
                О нас
              </a> */}
              {/* <NavLink to="/about" className={styles.about}>
                О Нас
              </NavLink> */}
            </div>

            <div className={styles.contacts}>
              <h4>Контакты</h4>
              <a href="tel:+998977501173">+ (998) 97 750-11-73</a>
              <a href="mailto:lulka_k@mail.ru">lulka_k@mail.ru</a>
            </div>
          </div>
        </div>
      </footer>

      <div className={styles.copyright}>
        <div className={styles.text}>
          <p>&copy;&nbsp;Yuliya Kutovaya Jewelry 2019-2022</p>
          <p className="my-2">Разработка сайта Ekaterina Kutovaya</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
