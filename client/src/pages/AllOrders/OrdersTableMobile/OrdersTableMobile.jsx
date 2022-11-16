import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LazyLoad from "react-lazyload";

import { fetchOrders, clearState } from "store/OrdersSlice";
import { fetchOrderImages } from "store/OrderImagesSlice";
import TableRowMobile from "./TableRowMobile";

import styles from "./OrdersTableMobile.module.scss";

const OrdersTableMobile = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.orders);
  const { category } = useSelector(state => state.filter);
  const { searchValue } = useSelector(state => state.filter);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    orders &&
      orders.map(item => {
        setFilteredOrders(prevState => [...prevState, item]);
      });

    return () => {
      setFilteredOrders([]);
    };
  }, [orders]);

  useEffect(() => {
    if (searchValue) {
      orders.filter(item => {
        if (
          item.order_id.includes(searchValue) ||
          item.order_name.toLowerCase().includes(searchValue) ||
          item.customer.toLowerCase().includes(searchValue)
        ) {
          setFilteredOrders(prevState => [...prevState, item]);
        }
      });
    } else {
      setFilteredOrders(orders);
    }

    return () => {
      setFilteredOrders([]);
    };
  }, [searchValue]);

  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchOrders(category));
  }, [category]);

  useEffect(() => {
    dispatch(fetchOrderImages());
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerCell}></div>
      </div>

      {filteredOrders &&
        filteredOrders.map((item, index) => (
          <LazyLoad key={index} height={100} once>
            <TableRowMobile item={item} />
          </LazyLoad>
        ))}
    </>
  );
};

export default OrdersTableMobile;
