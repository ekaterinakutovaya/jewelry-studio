import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AiOutlinePlusSquare } from "react-icons/ai";
import TableRow from "./TableRow";
import { currencyFormatter, numberFormatter } from "utils/utils";
import { addData, removeData, updateCalculation } from "store/CalculationSlice";
import { FaPlusSquare, FaTimes, FaCheck } from "react-icons/fa";

import styles from "./CalculationMobile.module.scss";
import TableRowMobile from "./TableRowMobile";

const CalculationMobile = ({ setCalculation, isDisabled }) => {
  const dispatch = useDispatch();
  const { calculation } = useSelector(state => state.calculation);
  const [rows, setRows] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const { prices } = useSelector(state => state.prices);
  

  useEffect(() => {
    if (calculation && calculation.length !== 0) {
      setRows([]);
      
      calculation.map((item, index) => {
          setRows(prevState => [
            ...prevState,
            {
              name: item.name,
              hallmark: item.hallmark,
              unit: item.unit,
              size: item.size,
              carat: item.carat || "",
              qty: +item.qty || "",
              price: item.price,
              price_id: +item.price_id,
              cost: +item.qty * +item.price,
            }
          ]);
      });
    }

    return () => {
      setRows([]);
    };
  }, [calculation]);

  useEffect(() => {
    setTotalCost(0);
    setCalculation([]);
  
    rows.map(item => {
      setTotalCost(prevState => prevState + +item.cost);
      if (item.name !== "") {
        setCalculation(prevState => [...prevState, item]);
      }
    });
  }, [rows]);


  const handleAddMore = () => {
    setRows([
      ...rows,
      {
        name: "",
        hallmark: "",
        unit: "",
        size: "",
        carat: "",
        qty: "",
        price: "",
        price_id: "",
        cost: "",
      }
    ]);

    dispatch(
      addData({
        name: "",
        hallmark: "",
        unit: "",
        size: "",
        carat: "",
        qty: "",
        price: "",
        price_id: "",
        cost: "",
      })
    );
  };

  const removeRow = (index) => {
    const list = [...rows];

    if (list.length - 1 > 0) {
      list.splice(index, 1);
      setRows(list);
      dispatch(removeData(index));
    } else {
      setRows([
        {
          name: "",
          hallmark: "",
          unit: "",
          size: "",
          carat: "",
          qty: "",
          price: "",
          cost: "",
        }
      ]);

      dispatch(removeData(index));
      dispatch(addData({
        name: "",
        hallmark: "",
        unit: "",
        size: "",
        carat: "",
        qty: "",
        price: "",
        price_id: "",
        cost: "",
      }));
    }

  };

  const handleInputChange = (value, index) => {
    const arr = [...rows];

    arr[index].name = value.name;
    arr[index].hallmark = value.hallmark;
    arr[index].unit = value.unit;
    arr[index].size = value.size;
    arr[index].carat = value.carat;
    arr[index].qty = value.qty;
    arr[index].price = value.price;
    arr[index].price_id = +value.price_id;
    arr[index].cost = +value.qty * +value.price;
    setRows(arr);
  };

  return (
    <>
      <h3 className="my-4" style={{fontWeight: '500', fontSize: '28px'}}>Калькуляция</h3>

      <div className={styles.table}>

        {rows && rows.map((row, index) => (
          <TableRowMobile
            item={row}
            key={index}
            onChange={handleInputChange}
            index={index}
            isDisabled={isDisabled}
            removeRow={removeRow}
          />
        ))}

        <div className={isDisabled ? styles.actionButtons : styles.actionButtonsActive} >
          <button className={styles.addMoreRow} onClick={handleAddMore}>
            <FaPlusSquare />
          </button>
        </div>

        <div className={styles.total}>ИТОГО: <span>{currencyFormatter(totalCost)}</span></div>
      </div>
    </>
  );
};

export default CalculationMobile;
