import React, { useState, useEffect } from "react";

import { numberFormatter } from "utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { addData, updateCalculation } from "store/CalculationSlice";
import Checkbox from "components/UI/Checkbox/Checkbox";

import styles from "./CalculationMobile.module.scss";

const TableRowMobile = ({ item, index, onChange, isDisabled = false }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(item);

  const [cost, setCost] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const { prices } = useSelector(state => state.prices);
  const { carats } = useSelector(state => state.carats);
  const [isPriceEditing, setIsPriceEditing] = useState(false);
  const [isSizeEditing, setIsSizeEditing] = useState(false);

  const togglePriceEditing = () => {
    if (values.price === 0) {
      setValues({
        ...values,
        price: ""
      });
    }
    setIsPriceEditing(!isPriceEditing);
  };

  const toggleSizeEditing = () => {
    if (values.size === 0) {
      setValues({
        ...values,
        size: ""
      });
    }
    setIsSizeEditing(!isSizeEditing);
  };

  
  useEffect(() => {
    setValues(item);
    setIsChecked(false);

    return () => {
      setValues([]);
    };
  }, [item]);

  useEffect(() => {
    setCost(+values.qty * +values.price);
    onChange(values, index, isChecked);
  }, [values]);

  const handleInputChange = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });

    dispatch(updateCalculation({ name, value, index }));
  };


  const getPricefromDB = () => {
    toggleSizeEditing();    

    if (
      (values.name.toLowerCase() === "бриллиант" ||
        values.name.toLowerCase() === "бриллианты") &&
      (+values.size > 0.85 && +values.size <= 7)
    ) {
      const price = prices.find(price => +price.diamond_size == +values.size);
      let carat = carats.find(carat => +carat.diamond_size == +values.size);

      if (!carat) {
        carat = "";
      }

      if (price) {
        setValues(values => ({
          ...values,
          carat: carat.diamond_carat,
          price: price.price_value,
          price_id: +price.price_id
        }));
        dispatch(
          updateCalculation({
            name: "carat",
            value: carat.diamond_carat,
            index: index
          })
        );
        dispatch(
          updateCalculation({
            name: "price",
            value: price.price_value,
            index: index
          })
        );
        dispatch(
          updateCalculation({
            name: "price_id",
            value: +price.price_id,
            index: index
          })
        );
      } else {
        setValues(values => ({
          ...values,
          carat: carat.diamond_carat
        }));
        dispatch(
          updateCalculation({
            name: "carat",
            value: carat.diamond_carat,
            index: index
          })
        );
      }
    }
  };

  const getMetallPricefromDB = () => {
    let price;
    // console.log('blur');
    switch (+values.hallmark) {
      case 583:
        price = prices.find(price => +price.hallmark == +values.hallmark);
        console.log(typeof price.price_value);
        
        setValues(values => ({
          ...values,
          name: "Золото",
          unit: "гр.",
          price: price.price_value,
          price_id: +price.price_id
        }));
        dispatch(
          updateCalculation({ name: "name", value: "Золото", index: index })
        );
        dispatch(
          updateCalculation({ name: "unit", value: "гр.", index: index })
        );
        dispatch(
          updateCalculation({
            name: "price",
            value: price.price_value,
            index: index
          })
        );
        dispatch(
          updateCalculation({
            name: "price_id",
            value: +price.price_id,
            index: index
          })
        );
        break;

      case 750:
        price = prices.find(price => +price.hallmark == +values.hallmark);
        setValues(values => ({
          ...values,
          name: "Золото",
          unit: "гр.",
          price: price.price_value,
          price_id: +price.price_id
        }));
        dispatch(
          updateCalculation({ name: "name", value: "Золото", index: index })
        );
        dispatch(
          updateCalculation({ name: "unit", value: "гр.", index: index })
        );
        dispatch(
          updateCalculation({
            name: "price",
            value: price.price_value,
            index: index
          })
        );
        dispatch(
          updateCalculation({
            name: "price_id",
            value: +price.price_id,
            index: index
          })
        );
        break;

      case 925:
        price = prices.find(price => +price.hallmark == +values.hallmark);
        // console.log(prices);

        setValues(values => ({
          ...values,
          name: "Серебро",
          unit: "гр.",
          price: price.price_value,
          price_id: +price.price_id
        }));
        dispatch(
          updateCalculation({ name: "name", value: "Серебро", index: index })
        );
        dispatch(
          updateCalculation({ name: "unit", value: "гр.", index: index })
        );
        dispatch(
          updateCalculation({
            name: "price",
            value: price.price_value,
            index: index
          })
        );
        dispatch(
          updateCalculation({
            name: "price_id",
            value: +price.price_id,
            index: index
          })
        );
        break;
    }
  };

  return (
    <div className={styles.row}>

      <div className={styles.cell}>
        <label htmlFor="" style={{ fontWeight: '500' }}>Материал</label>
      </div>
      <div className={styles.cell}>
        <input
          data-index={index}
          name="name"
          type="text"
          align="left"
          className={styles.input}
          value={values.name}
          onChange={handleInputChange}
          disabled={isDisabled ? true : false}
          style={{ fontWeight: '500' }}
        />
      </div>

      <div className={styles.cell}>
        <label htmlFor="">Проба</label>
      </div>
      <div className={styles.cell}>
        <input
          data-index={index}
          name="hallmark"
          type="text"
          className={styles.input}
          value={values.hallmark}
          onChange={handleInputChange}
          onBlur={getMetallPricefromDB}
          disabled={isDisabled ? true : false}
        />
      </div>

      <div className={styles.cell}>
        <label htmlFor="">Ед.изм</label>
      </div>
      <div className={styles.cell}>
        <input
          data-index={index}
          name="unit"
          type="text"
          className={styles.input}
          value={values.unit}
          onChange={handleInputChange}
          disabled={isDisabled ? true : false}
        />
      </div>

      <div className={styles.cell}>
        <label htmlFor="">Размер, мм.</label>
      </div>
      <div className={styles.cell}>
        {isSizeEditing ? (
          <input
            type="number"
            name="size"
            className={styles.inputEditing}
            value={values.size}
            onChange={handleInputChange}
            onBlur={getPricefromDB}
          />
        ) : (
          <input
            type="text"
            name="size"
            className={styles.inputReadonly}
            value={values.size != "" ? numberFormatter(values.size, 1, 2) : ""}
            onChange={handleInputChange}
            onFocus={toggleSizeEditing}
            readOnly
            disabled={isDisabled ? true : false}
          />
        )}
      </div>

      <div className={styles.cell}>
        <label htmlFor="">Карат</label>
      </div>
      <div className={styles.cell}>
        <input
          type="number"
          name="carat"
          className={styles.input}
          value={values.carat}
          onChange={handleInputChange}
          disabled={isDisabled ? true : false}
        />
      </div>

      <div className={styles.cell}>
        <label htmlFor="">Кол-во</label>
      </div>
      <div className={styles.cell}>
        <input
          type="number"
          name="qty"
          className={styles.input}
          value={values.qty}
          onChange={handleInputChange}
          disabled={isDisabled ? true : false}
        />
      </div>

      <div className={styles.cell}>
        <label htmlFor="">Цена</label>
      </div>
      <div className={styles.cell}>
        {isPriceEditing ? (
          <input
            type="number"
            name="price"
            className={styles.inputEditing}
            value={values.price}
            onChange={handleInputChange}
            onBlur={togglePriceEditing}
            data-trigger="addRow"
            disabled={isDisabled ? true : false}
          />
        ) : (
          <input
            type="text"
            name="price"
            className={styles.inputReadonly}
            value={
              values.price != "" ? numberFormatter(values.price, 2, 2) : ""
            }
            onChange={handleInputChange}
            data-trigger="addRow"
            onFocus={togglePriceEditing}
            readOnly
            disabled={isDisabled ? true : false}
          />
        )}
      </div>

      <div className={styles.cell}>
        <label htmlFor="" style={{fontWeight: '500'}}>Стоимость</label>
      </div>
      <div className={styles.cell}>
        <span type="text" name="cost" className={styles.span}>
          {cost !== 0 ? numberFormatter(cost, 2, 2) : ""}
        </span>
      </div>

    </div>
  );
};

export default TableRowMobile;
