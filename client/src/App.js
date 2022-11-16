import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";
import Auth from "pages/Auth/Auth";
import AllOrders from "pages/AllOrders/AllOrders";
import OrderPage from "pages/SingleOrder/OrderPage/OrderPage";
import OrderPageMobile from "pages/SingleOrder/OrderPageMobile/OrderPageMobile";
import NewOrder from "pages/SingleOrder/NewOrder";
import Prices from "pages/Prices/Prices";
import RequireAuth from "pages/Auth/RequireAuth";
import ScrollUpButton from "components/UI/Button/ScrollUpButton";


function App() {
  const { isLoggedIn } = useSelector(state => state.auth);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
 


  return (
    <BrowserRouter>
      {isLoggedIn ? <Header /> : ""}
      {isLoggedIn ? <Sidebar /> : ""}

      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/registration" element={<Auth />} />
        <Route
          path="/orders"
          element={
            <RequireAuth>
              <AllOrders />
            </RequireAuth>
          }
        />
        <Route
          path="/orders/order/:id"
          element={
            <RequireAuth>
              {isTabletOrMobile ? (
                <OrderPageMobile/>
              ) : (
                  <OrderPage />
              )}
            </RequireAuth>
          }
        />
        <Route
          path="/orders/new"
          element={
            <RequireAuth>
              <NewOrder />
            </RequireAuth>
          }
        />
        <Route
          path="/prices"
          element={
            <RequireAuth>
              <Prices />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/orders" />} />
      </Routes>

      <ScrollUpButton />
    </BrowserRouter>
  );
}

export default App;
