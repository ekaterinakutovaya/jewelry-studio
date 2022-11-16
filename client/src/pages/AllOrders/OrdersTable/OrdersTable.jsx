import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";

import TableRow from "./TableRow";
import { fetchOrders, clearState, search } from "store/OrdersSlice";
import { fetchOrderImages } from "store/OrderImagesSlice";
import { setFetching } from "store/FetchingSlice";
import { setCurrentPage } from "store/CurrentPageSlice";
import LazyLoad from "react-lazyload";

import styles from "./OrdersTable.module.scss";

const OrdersGridTable = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.orders);
  const { category } = useSelector(state => state.filter);
//   const { editMode } = useSelector(state => state.editMode);
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
        <div className={styles.headerCell}>ID</div>
        <div className={styles.headerCell}>Фото</div>
        <div className={styles.headerCell}>Название/Заказчик</div>
        <div className={styles.headerCell}>Проба/цвет металла</div>
        <div className={styles.headerCell}>Дата отдачи</div>
        <div className={styles.headerCell}>Срочность</div>
        <div className={styles.headerCell}>Категория</div>
        <div className={styles.headerCell}>Состояние</div>
        <div className={styles.headerCell}>Резка</div>
        <div className={styles.headerCell}>Файл</div>
        <div className={styles.headerCell}>Ред.</div>
      </div>

      {filteredOrders &&
        filteredOrders.map((item, index) => (
          <LazyLoad key={index} height={100} once>
          <TableRow item={item} />
          </LazyLoad>
        ))}
    </>
  );
};

export default OrdersGridTable;
