import { useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { logout } from "../store/AuthSlice";

import { Button } from '@/components';
import Logo from "@/assets/Mozaic.webp";

const navigation = [
  { name: 'Мастерская', to: '/orders', isActive: true },
  { name: 'Цены', to: '/prices', isActive: false }
]

export const Navbar = () => {
  const dispatch = useDispatch();
  const [openNav, setOpenNav] = useState(false);

  const collapsed = "hidden";
  const visible = "w-full md:block md:w-auto";

  const activeNavLink = 'block py-3 pl-3 pr-4 text-white bg-purple-600 rounded md:bg-transparent md:text-purple-700 md:p-0 dark:text-white';
  const idleNavLink = 'block py-3 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const toggleMenu = () => {
    setOpenNav(!openNav)
  }

  const logOut = () => {
    dispatch(logout());
  };



  return (
    <nav className="flex items-center justify-between bg-white px-2 sm:px-4 py-6 dark:bg-gray-900 drop-shadow-md">
      <div className="container max-w-7xl px-8 lg:px-8 flex flex-wrap items-center justify-between mx-auto">
        <div className="flex items-center">
          <Link to="/orders">
            <img src={Logo} alt="logo" className="w-10 h-10" />
          </Link>

          <div className="hidden md:block">
            <ul className="ml-12 flex space-x-4">
              {navigation.map((item, index) => (
                <li key={index} className="mb-2 md:mb-0">
                  <NavLink to={item.to}
                    className={({ isActive }) =>
                      isActive
                        ? "px-3 py-2 rounded-md text-sm font-medium text-purple-700 bg-gray-100"
                        : "px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-purple-700"
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="ml-4 flex items-center md:ml-6">
            <Button type="text" onClick={logOut}>Выйти</Button>
          </div>
        </div>

        <button type="button" className="inline-flex items-center p-2 ml-3 text-sm text-purple-600 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" onClick={toggleMenu}>
          <span className="sr-only">Open main menu</span>
          {openNav ? (
            <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
          ) : (
            <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
          )}
        </button>

        <div className={openNav ? visible : collapsed}>
          <ul className="flex flex-col p-4 mt-6 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navigation.map((item, index) => (
              <li key={index} className="mb-4">
                <NavLink to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? activeNavLink
                      : idleNavLink
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex md:hidden items-center justify-center">
            <Button type="dark" onClick={logOut}>Выйти</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
