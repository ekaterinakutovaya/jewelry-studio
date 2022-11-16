import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Button from 'components/UI/Button/Button';
import Tab from 'components/UI/Tab/Tab';
import { categories } from "utils/consts";
import { useNavigate } from "react-router-dom";
import { fetchPrices } from "store/PricesSlice";
import { fetchCarats } from "store/CaratsSlice";
import Search from 'components/Search/Search';
import OrdersTable from "./OrdersTable/OrdersTable";
import { useMediaQuery } from "react-responsive";
import TabMobile from 'components/UI/Tab/TabMobile';
import OrdersTableMobile from './OrdersTableMobile/OrdersTableMobile';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const loading = useSelector(state => state.loading);

  useEffect(() => {
    dispatch(fetchPrices());
    dispatch(fetchCarats());
  }, [])



  return (
    <div className="container-fluid">
      <div className="row my-5 justify-content-end">
        <Button type="dark" onClick={() => navigate("/orders/new")}>
          Добавить заказ
        </Button>
      </div>

      <div className="row">
        {isTabletOrMobile ? (
          <TabMobile tabs={categories} />
        ) : (
          <Tab tabs={categories} />
        )}


        <Search />
      </div>

      {/* {loading ? (
        "Loading..."
      ) : (
        <OrdersTable />
      )} */}

      {isTabletOrMobile ? (
        <OrdersTableMobile/>
      ) : (
          <OrdersTable />
      )}



    </div>
  );
};

export default Orders;