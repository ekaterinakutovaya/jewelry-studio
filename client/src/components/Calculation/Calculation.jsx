import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlusSquare, FaTimes, FaCheck } from "react-icons/fa";

import { currencyFormatter, numberFormatter } from "@/utils/utils";
import { addData, removeData, updateCalculation } from "@/store/CalculationSlice";
import Row from "./Row";

export const Calculation = ({ setCalculationData }) => {
  const dispatch = useDispatch();
  const { isEditMode } = useSelector(state => state.editMode);
  const { calculation } = useSelector(state => state.calculation);
  const [rows, setRows] = useState([{ name: "", hallmark: "", unit: "", size: "", carat: "", qty: "", price: "", priceId: "", cost: "" }]);
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
            priceId: +item.priceId,
            cost: +item.qty * +item.price,
          }
        ]);
      });
    }

    return () => {
      setRows([{ name: "", hallmark: "", unit: "", size: "", carat: "", qty: "", price: "", priceId: "", cost: "" }]);
    };
  }, [calculation]);

  useEffect(() => {
    setTotalCost(0);
    setCalculationData([]);

    rows.map(item => {
      setTotalCost(prevState => prevState + +item.cost);
      if (item.name !== "") {
        setCalculationData(prevState => [...prevState, item]);
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
        priceId: "",
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
        priceId: "",
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
        priceId: "",
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
    arr[index].priceId = +value.priceId;
    arr[index].cost = +value.qty * +value.price;
    setRows(arr);
  };

  return (
    <div className="mt-20">
      <h4 className="my-4 font-medium text-lg">Калькуляция</h4>

      {isEditMode ? (
        <div className="hidden md:flex mb-3 opacity-100">
          <button onClick={handleAddMore}>
            <FaPlusSquare className="text-purple-600 text-lg hover:text-purple-700" />
          </button>
        </div>
      ) : (
        ''
      )}

      <div className="md:block md:rounded-xl md:bg-white md:drop-shadow-md">
        <div className="hidden md:grid grid-cols-[0.4fr,1.6fr] sm:grid-cols-[1.7fr,0.6fr,0.6fr,0.6fr,0.6fr,0.6fr,0.8fr,0.8fr,0.5fr] gap-2.5 lg:gap-0 grid-rows-1  text-xs font-bold text-center p-4 bg-white border-b border-border-main rounded-t-xl">
          <div className="hidden md:block">Материал</div>
          <div className="hidden md:block">Проба</div>
          <div className="hidden md:block">Размер, мм.</div>
          <div className="hidden md:block">Карат</div>
          <div className="hidden md:block">Кол-во</div>
          <div className="hidden md:block">Ед.изм</div>
          <div className="hidden md:block">Цена</div>
          <div className="hidden md:block">Стоимость</div>
          <div className="hidden md:block"></div>
        </div>

        
        {rows.map((row, index) => (
          <Row
            item={row}
            key={index}
            onChange={handleInputChange}
            index={index}
            removeRow={removeRow}
          />
        ))}

        {isEditMode ? (
        <div className="flex md:hidden mb-3 opacity-100">
          <button onClick={handleAddMore}>
            <FaPlusSquare className="text-purple-600 text-xl hover:text-purple-700" />
          </button>
        </div>
      ) : (
        ''
      )}

        <div className="grid grid-cols-[0.5fr,1.5fr] md:grid-cols-[1.7fr,0.6fr,0.6fr,0.6fr,0.6fr,0.6fr,0.8fr,0.8fr,0.5fr] grid-rows-1 rounded-b-lg text-xs font-bold p-4 bg-transparent md:bg-white rounded-b-xl bg-gray-50">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="text-base md:text-sm flex items-center justify-center">ИТОГО:</div>
          <div className="flex items-center justify-center text-base md:text-sm p-1">{currencyFormatter(totalCost)}</div>
          <div></div>
        </div>
      </div>

    </div>
  );
};
