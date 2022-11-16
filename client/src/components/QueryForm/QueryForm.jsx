import React, { useState } from "react";
import styles from "./QueryForm.module.scss";
import Button from "../UI/Button/Button";
import { GrClose } from "react-icons/gr";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import axios from "axios";
// import { toastifySuccess } from "../../store/actions/toastifyAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";




const QueryForm = ({ productName, visible, setVisible }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm();

  const onSubmit = data => {
    data.phoneNumber = data.phoneNumber.slice(8).replace(/\s/g, "");
    // console.log(data.phoneNumber);
    
    sendToTelegram(data.customerName, data.phoneNumber, productName);
  };


  const sendToTelegram = async (customerName, phoneNumber, productName) => {
    const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("phoneNumber", +phoneNumber);
    formData.append("productName", productName);
    formData.append("action", 'telegram');

    axios({
      method: "post",
      url: "https://yuliya.kutovaya.ru/index.php",
      credentials: "include",
      mode: "cors",
      data: formData,
      config: {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    })
      .then(response => {
        // console.log(response);
        toast.success("Данные успешно отправлены", {
          position: toast.POSITION.TOP_CENTER
        });
        setVisible(false);
      })
      .catch(response => {
        // console.log('error' + response)
      });
  }

  



  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
    
      <GrClose className={styles.close} onClick={() => setVisible(false)} />

      <h6 className={styles.title}>Заказ</h6>
      <h5 className={styles.productName}>{productName}</h5>
      <p className={styles.message}>
        Оставьте ваше имя и номер телефона, и мы перезвоним вам
      </p>

      {errors.customerName && <p style={{ color: "red" }}>Введите имя</p>}
      <input
        className={styles.name}
        name="customerName"
        type="text"
        placeholder="Имя"
        {...register("customerName", { required: true })}
      />

      {errors["phoneNumber"] && (
        <p style={{ color: "red" }}>Введите номер телефона</p>
      )}

      <InputMask
        className={styles.phone}
        mask="+ (\9\9\8) 99 999 99 99"
        name="phoneNumber"
        placeholder="+(998) __ ___ __ __"
        {...register("phoneNumber", { required: true })}
      />

      <Button type="dark" value="Submit">
        Отправить
      </Button>
    </form>
  );
};

export default QueryForm;
