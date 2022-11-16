import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Calculation.module.scss";
import { AiOutlinePlusSquare } from "react-icons/ai";
import TableRow from "./TableRow";
import { currencyFormatter, numberFormatter } from "utils/utils";
import { addData, removeData, updateCalculation } from "store/CalculationSlice";
import { FaPlusSquare, FaTimes, FaCheck } from "react-icons/fa";

const Calculation = ({ setCalculation, isDisabled }) => {
  const dispatch = useDispatch();
  const { calculation } = useSelector(state => state.calculation);
  const [rows, setRows] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const { prices } = useSelector(state => state.prices);

  useEffect(() => {
    if (calculation && calculation.length !== 0) {
      setRows([]);
      
      calculation.map((item, index) => {
        // console.log(item.name);
          setRows(prevState => [
            ...prevState,
            {
              name: item.name,
              hallmark: item.hallmark,
              unit: item.unit,
              size: item.size,
              carat: item.carat || "",
              qty: +item.qty || "",
              price: +item.price,
              price_id: +item.price_id,
              cost: +item.qty * +item.price,
              isChecked: false
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

  useEffect(() => {
    // console.log(rows);

    const listener = e => {
      if (e.target.dataset.trigger === "addRow") {
        if (
          e.code === "Enter" ||
          e.code === "NumpadEnter" ||
          e.code === "Tab"
        ) {
          handleAddMore();
        }
      }
    };
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
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
        isChecked: false
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
        isChecked: false
      })
    );
  };

  const removeRow = () => {
    // console.log('remove');
    
    
    const list = [...rows];

    rows.map((item, index) => {
      if (item.isChecked) {
        if (list.length - 1 > 0) {
          // setRows(list.filter((el, i) => index !== i));
          dispatch(removeData(index));
        } else {
          // setRows([
          //   {
          //     name: "",
          //     hallmark: "",
          //     unit: "",
          //     size: "",
          //     carat: "",
          //     qty: "",
          //     price: "",
          //     cost: "",
          //     isChecked: false
          //   }
          // ]);
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
            isChecked: false
          }));
        }
      }
    });
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
    arr[index].isChecked = value.isChecked;
    setRows(arr);
  };

  return (
    <div>
      <h4 className="my-4">Калькуляция</h4>

      <div
        className={
          isDisabled ? styles.actionButtons : styles.actionButtonsActive
        }
      >
        <button className={styles.addMoreRow} onClick={handleAddMore}>
          <FaPlusSquare />
        </button>
        <button className={styles.deleteRow} onClick={removeRow}>
          <FaTimes />
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>Наименование</th>
            <th>Проба</th>
            <th>Ед.изм</th>
            <th>Размер, мм.</th>
            <th>Карат</th>
            <th>Кол-во</th>
            <th>Цена</th>
            <th>Стоимость</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <TableRow
              item={row}
              key={index}
              onChange={handleInputChange}
              index={index}
              isDisabled={isDisabled}
            />
          ))}
          {/* <tr><td></td></tr> */}
        </tbody>
        <tfoot className={styles.footer}>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>Итого</td>
            <td>{currencyFormatter(totalCost)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Calculation;
