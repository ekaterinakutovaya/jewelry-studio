import React, { useState } from "react";
import styles from "./QueryForm.module.scss";
import Button from "../UI/Button/Button";
import { GrClose } from "react-icons/gr";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const QueryForm = ({ productName, visible, setVisible }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm();

  const onSubmit = data => {
    // console.log(data);
  };

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

      {/* <input
        className={styles.phone}
        type="tel"
              autofocus="autofocus" required="required"
        placeholder="+(998) __ ___ __ __"
              {...register("age", { pattern: `\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}`})}
      /> */}

      {errors["phoneNumber"] && (
        <p style={{ color: "red" }}>Введите номер телефона</p>
      )}

      <Controller
        control={control}
        name="phoneNumber"
        rules={{
          validate: (value) => isValidPhoneNumber(value)
        }}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            id="phoneNumber"
            {...register("phoneNumber", { required: true })}
            areaCodes={{ uz: ["998"] }}
            country={"uz"}
            value={value}
            onChange={onChange}
            inputProps={{ name: "phoneNumber" }}
            inputStyle={{
              borderRadius: "0",
              color: "inherit",
              padding: "15px 15px 15px 48px",
              marginBottom: "20px",
              width: "100%",
              height: "auto",
              border: "1px solid #ddddd"
            }}
          />
        )}
      />

      <Button type="dark" value="Submit" margin="marginTop20">
        Отправить
      </Button>
    </form>
  );
};

export default QueryForm;
