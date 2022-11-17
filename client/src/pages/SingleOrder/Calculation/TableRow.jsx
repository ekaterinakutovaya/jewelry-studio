import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import { numberFormatter, setGemsPrice, setMetallPrice } from "utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { updateCalculation } from "store/CalculationSlice";

import styles from "./Calculation.module.scss";

const TableRow = ({ item, index, onChange, isDisabled = false, removeRow }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(item);

  const [cost, setCost] = useState(0);
  const { prices } = useSelector(state => state.prices);
  const { carats } = useSelector(state => state.carats);
  const [isPriceEditing, setIsPriceEditing] = useState(false);
  const [isSizeEditing, setIsSizeEditing] = useState(false);

  useEffect(() => {
    setValues(item);

    return () => {
      setValues([]);
    };
  }, [item]);

  useEffect(() => {
    setCost(+values.qty * +values.price);
    onChange(values, index);
  }, [values]);

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

  const inputChangeHandler = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });

    dispatch(updateCalculation({ name, value, index }));
  };

  const gemsPriceAndCaratsHandler = () => {
    setGemsPrice({ index, values, prices, carats, setValues });
    toggleSizeEditing();
  }

  const metallPriceHandler = () => {
    setMetallPrice({ index, values, prices, setValues });
  };

  return (
    <tr className={styles.row}>
      <td>
        <input
          data-index={index}
          name="name"
          type="text"
          align="left"
          className={styles.input}
          value={values.name}
          onChange={inputChangeHandler}
          disabled={isDisabled ? true : false}
        />
      </td>
      <td>
        <input
          data-index={index}
          name="hallmark"
          type="text"
          className={styles.input}
          value={values.hallmark}
          onChange={inputChangeHandler}
          onBlur={metallPriceHandler}
          disabled={isDisabled ? true : false}
        />
      </td>
      
      <td>
        {isSizeEditing ? (
          <input
            type="number"
            name="size"
            className={styles.inputEditing}
            value={values.size}
            onChange={inputChangeHandler}
            onBlur={gemsPriceAndCaratsHandler}
          />
        ) : (
          <input
            type="text"
            name="size"
            className={styles.inputReadonly}
            value={values.size != "" ? numberFormatter(values.size, 1, 2) : ""}
              onChange={inputChangeHandler}
            onFocus={toggleSizeEditing}
            readOnly
            disabled={isDisabled ? true : false}
          />
        )}
      </td>
      <td>
        <input
          type="number"
          name="carat"
          className={styles.input}
          value={values.carat}
          onChange={inputChangeHandler}
          disabled={isDisabled ? true : false}
        />
      </td>
      <td>
        <input
          type="number"
          name="qty"
          className={styles.input}
          value={values.qty}
          onChange={inputChangeHandler}
          disabled={isDisabled ? true : false}
        />
      </td>
      <td>
        <input
          data-index={index}
          name="unit"
          type="text"
          className={styles.input}
          value={values.unit}
          onChange={inputChangeHandler}
          disabled={isDisabled ? true : false}
        />
      </td>
      <td>
        {isPriceEditing ? (
          <input
            type="number"
            name="price"
            className={styles.inputEditing}
            value={values.price}
            onChange={inputChangeHandler}
            onBlur={togglePriceEditing}
          />
        ) : (
          <input
            type="text"
            name="price"
            className={styles.inputReadonly}
            value={
              values.price !== "" ? numberFormatter(values.price, 2, 2) : ""
            }
              onChange={inputChangeHandler}
            onFocus={togglePriceEditing}
            readOnly
            disabled={isDisabled ? true : false}
          />
        )}
      </td>
      <td>
        <span type="text" name="cost" className={styles.input}>
          {cost !== 0 ? numberFormatter(cost, 2, 2) : ""}
        </span>
      </td>

      {!isDisabled ? (
        <td >
          <button onClick={e => removeRow(index)}>
            <AiFillCloseCircle className={styles.removeRow} />
          </button>
        </td>
      ) : (
        ""
      )}
    </tr>
  );
};

export default TableRow;
