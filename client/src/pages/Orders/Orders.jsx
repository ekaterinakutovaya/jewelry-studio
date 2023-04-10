import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LazyLoad from 'react-lazyload';
import { FaGhost } from "react-icons/fa";
import { CgSortAz } from "react-icons/cg";

import { categories } from "@/utils/consts";

import { fetchOrders, clearState, search } from '@/store/OrdersSlice';
import { fetchPrices } from "@/store/PricesSlice";
import { fetchCarats } from "@/store/CaratsSlice";
import { fetchImages } from '@/store/ImagesSlice';
import { fetchFiles } from '@/store/FilesSlice';

import Logo from "../../assets/Mozaic.webp";
import { Button, Search, Tabs, Spinner } from '@/components';
import Row from './Row';


export const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector(state => state.orders);
  const { category } = useSelector(state => state.filter);
  const { searchValue } = useSelector(state => state.filter);
  const { loading } = useSelector(state => state.orders);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [sort, setSort] = useState('default');

  useEffect(() => {
    document.title = `Мастерская`;
  }, [])

  useEffect(() => {
    setLoadingStatus(loading);
  }, [loading])

  useEffect(() => {
    dispatch(fetchPrices());
    dispatch(fetchCarats());
    dispatch(fetchOrders(category));
    dispatch(fetchImages());
    dispatch(fetchFiles());
  }, [])

  useEffect(() => {
    orders &&
      orders.map(order => {
        setFilteredOrders(prevState => [...prevState, order]);
      });

    return () => {
      setFilteredOrders([]);
    };
  }, [orders]);

  useEffect(() => {
    if (searchValue) {
      setLoadingStatus(true);
      orders.filter(item => {
        if (
          item.orderId.includes(searchValue) ||
          item.orderName.toLowerCase().includes(searchValue) ||
          item.customer.toLowerCase().includes(searchValue)
        ) {
          setFilteredOrders(prevState => [...prevState, item]);
          setLoadingStatus(false);
        } else {
          setLoadingStatus(false);
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

  const sortDate = () => {
    setFilteredOrders([]);
    let arr = Array.from(orders);
    let sorted = arr.sort((a, b) => {
      return new Date(a.handoverDate) - new Date(b.handoverDate);
    });

    sorted.map(order => {
      setFilteredOrders(prevState => [...prevState, order]);
    });
  }


  return (
    <div className="container pb-52">
      <div className="mx-auto py-12 px-4 sm:px-6 flex lg:justify-end sm:justify-center">
        <Button type="light" onClick={() => navigate("/orders/new")}>Добавить заказ</Button>
      </div>

      <div className="mb-3 md:mb-2 flex items-center sm:justify-center md:justify-between flex-wrap md:flex-nowrap">
        <Tabs tabs={categories} />

        <Search />
      </div>

      <div className="md:block md:rounded-[20px] md:bg-white md:drop-shadow-2xl">
        <div className="hidden md:grid grid-lines gap-2.5 lg:gap-0 grid-cols-1 lg:grid-cols-[0.2fr,0.7fr,1.1fr,1.1fr,1.1fr,1.1fr,1.1fr,1.1fr,0.5fr,0.5fr,0.5fr] grid-rows-1 bg-white rounded-t-lg rounded-t-[20px] text-[12px] font-bold border-b border-border-main text-center p-4">
          <div className="hidden md:block">ID</div>
          <div className="hidden md:block">Фото</div>
          <div className="hidden md:block">Название/Заказчик</div>
          <div className="hidden md:block">Проба/цвет металла</div>
          <div className="hidden md:block">Дата отдачи</div>
          {/* <div className="hidden md:flex items-center justify-center border-dotted border-2 border-indigo-600">
            Дата отдачи
            <button onClick={sortDate}><CgSortAz /></button>
          </div> */}
          <div className="hidden md:block">Срочность</div>
          <div className="hidden md:block">Категория</div>
          <div className="hidden md:block">Состояние</div>
          <div className="hidden md:block">Резка</div>
          <div className="hidden md:block">Файл</div>
          <div className="hidden md:block">Ред.</div>
        </div>


        {filteredOrders.length ? filteredOrders.map((order, index) => (
          <LazyLoad key={`${order.orderId}${index}`} height={100} once>
            <Row order={order} />
          </LazyLoad>
        )) : (
          loadingStatus ? (
            <div className="flex justify-center items-center bg-white md:border-b border-border-main mb-10 md:mb-0 rounded-[20px] md:rounded-none shadow-2xl md:shadow-none px-4 sm:px-10 md:px-8 lg:px-4 py-10 sm:py-12 lg:py-8 text-purple-600">
              <Spinner color={'text-purple-600'} />
            </div>
          ) : (
            <div className="flex justify-center items-center bg-white md:border-b border-border-main mb-10 md:mb-0 rounded-[20px] md:rounded-none shadow-2xl md:shadow-none px-4 sm:px-10 md:px-8 lg:px-4 py-10 sm:py-12 lg:py-8 text-purple-500">
              <FaGhost className="text-lg mr-2" /> Нет записей
            </div>
          )

        )}

        <div className="hidden md:grid overflow-hidden grid-lines grid-cols-11 grid-rows-1 bg-white rounded-b-[20px] p-8 text-[12px]">
        </div>

      </div>
    </div>
  );
};
