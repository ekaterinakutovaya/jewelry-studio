import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaTelegram, FaDownload, FaPencilAlt, FaBolt, FaExclamationCircle } from "react-icons/fa";

import { setEditMode } from '@/store/EditModeSlice';
import { fetchCalculationByID } from '@/store/CalculationSlice';

import { Button, OrderForm } from "@/components";


export const OrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector(state => state.orders.orders.find(order => order.orderId === id));
  const images = useSelector(state => state.images.images.filter(image => image.orderId === id));
  const {calculation} = useSelector(state => state.calculation);
  const { isEditMode } = useSelector(state => state.editMode);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

 

  return (
    <div className="container pb-[300px]">
    
      <OrderForm order={order} images={images} calculation={calculation}/>
      
    </div>
  );
};
