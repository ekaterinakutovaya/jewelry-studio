import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

import { numberFormatter, setGemsPrice, setMetallPrice } from "@/utils/utils";

import { updateCalculation } from "@/store/CalculationSlice";

const Row = ({ item, index, onChange, removeRow }) => {
  const dispatch = useDispatch();
  const { isEditMode } = useSelector(state => state.editMode);
  const [values, setValues] = useState(item);
  const [cost, setCost] = useState(0);

  const [isPriceEditing, setIsPriceEditing] = useState(false);

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

  const inputChangeHandler = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });

    dispatch(updateCalculation({ name, value, index }));
  };

  const gemsPriceAndCaratsHandler = () => {
    setGemsPrice({ index, values, setValues });
  }

  const metallPriceHandler = () => {
    setMetallPrice({ index, values, setValues });
  };

  return (
    <div className="grid grid-cols-[0.4fr,1.6fr] md:grid-cols-[1.7fr,0.6fr,0.6fr,0.6fr,0.6fr,0.6fr,0.8fr,0.8fr,0.5fr] grid-rows-1 text-xs text-left md:p-4 mb-4 md:mb-0 bg-white md:border-b border-border-main rounded-t-xl rounded-b-xl md:rounded-none shadow-xl md:shadow-none">

      <div className="col-span-2 md:hidden flex justify-end items-center p-6 md:p-0 border-b md:border-0 border-border-main">
        {isEditMode ? (
          <button onClick={e => removeRow(index)}>
            <AiFillCloseCircle className="text-red-500 text-lg lg:text-base hover:opacity-70 transition duration-150 ease-out hover:ease-in" />
          </button>
        ) : (
          ""
        )}
      </div>

      <div className="flex md:hidden items-center py-1.5 px-4 text-sm border-b border-r border-border-main">
        <label htmlFor="">Материал</label>
      </div>

      <div className="px-3 py-1 border-b md:border-b-0 md:border-r border-border-main">
        <input
          data-index={index}
          name="name"
          type="text"
          align="left"
          className="block w-full rounded-md border outline-transparent border-transparent focus:border focus:border-purple-600 focus:ring-purple-600 text-base md:text-sm"
          value={values.name}
          onChange={inputChangeHandler}
          disabled={isEditMode ? false : true}
        />
      </div>

      <div className="flex md:hidden items-center py-1.5 px-4 text-sm border-b border-r border-border-main">
        <label htmlFor="">Проба</label>
      </div>

      <div className="px-3 py-1 border-b md:border-b-0 md:border-r border-border-main px-4">
        <input
          data-index={index}
          name="hallmark"
          type="text"
          className="block w-full rounded-md border outline-transparent border-transparent focus:border focus:border-purple-600 focus:ring-purple-600 text-base md:text-sm md:text-center"
          value={values.hallmark}
          onChange={inputChangeHandler}
          onBlur={metallPriceHandler}
          disabled={isEditMode ? false : true}
        />
      </div>

      <div className="flex md:hidden items-center py-1.5 px-4 text-sm border-b border-r border-border-main">
        <label htmlFor="">Размер</label>
      </div>

      <div className="px-3 py-1 border-b md:border-b-0 md:border-r border-border-main">
        <input
          type="text"
          name="size"
          className="block w-full rounded-md border outline-transparent border-transparent focus:border focus:border-purple-600 focus:ring-purple-600 text-base md:text-sm md:text-center"
          value={values.size || ""}
          onChange={inputChangeHandler}
          onBlur={gemsPriceAndCaratsHandler}
          disabled={isEditMode ? false : true}
        />
      </div>

      <div className="flex md:hidden items-center py-1.5 px-4 text-sm border-b border-r border-border-main">
        <label htmlFor="">Карат</label>
      </div>
      <div className="px-3 py-1 border-b md:border-b-0 md:border-r border-border-main">
        <input
          type="number"
          name="carat"
          className="block w-full rounded-md border outline-transparent border-transparent focus:border focus:border-purple-600 focus:ring-purple-600 text-base md:text-sm md:text-center"
          value={values.carat}
          onChange={inputChangeHandler}
          disabled={isEditMode ? false : true}
        />
      </div>

      <div className="flex md:hidden items-center py-1.5 px-4 text-sm border-b border-r border-border-main">
        <label htmlFor="">Кол-во</label>
      </div>
      <div className="px-3 py-1 border-b md:border-b-0 md:border-r border-border-main">
        <input
          type="number"
          name="qty"
          className="block w-full rounded-md border outline-transparent border-transparent focus:border focus:border-purple-600 focus:ring-purple-600 text-base md:text-sm md:text-center"
          value={values.qty}
          onChange={inputChangeHandler}
          disabled={isEditMode ? false : true}
        />
      </div>

      <div className="flex md:hidden items-center py-1.5 px-4 text-sm border-b border-r border-border-main">
        <label htmlFor="">Ед. изм.</label>
      </div>
      <div className="px-3 py-1 border-b md:border-b-0 md:border-r border-border-main">
        <input
          data-index={index}
          name="unit"
          type="text"
          className="block w-full rounded-md border outline-transparent border-transparent focus:border focus:border-purple-600 focus:ring-purple-600 text-base md:text-sm md:text-center"
          value={values.unit}
          onChange={inputChangeHandler}
          disabled={isEditMode ? false : true}
        />
      </div>

      <div className="flex md:hidden items-center py-1.5 px-4 text-sm border-b border-r border-border-main">
        <label htmlFor="">Цена</label>
      </div>
      <div className="px-3 py-1 border-b md:border-b-0 md:border-r border-border-main">
        {isPriceEditing ? (
          <input
            type="number"
            name="price"
            className="block w-full rounded-md border outline-transparent border-transparent focus:border focus:border-purple-600 focus:ring-purple-600 text-base md:text-sm md:text-center"
            value={values.price}
            onChange={inputChangeHandler}
            onBlur={togglePriceEditing}
          />
        ) : (
          <input
            type="text"
            name="price"
              className="block w-full rounded-md border outline-transparent border-transparent focus:border focus:border-purple-600 focus:ring-purple-600 text-base md:text-sm md:text-center"
            value={
              values.price !== "" ? numberFormatter(values.price, 2, 2) : ""
            }
            onChange={inputChangeHandler}
            onFocus={togglePriceEditing}
            readOnly
            disabled={isEditMode ? false : true}
          />
        )}
      </div>

      <div className="flex md:hidden items-center py-1.5 px-4 text-sm font-bold border-r border-border-main">
        <label htmlFor="">Стоимость</label>
      </div>

      <div className="px-3 py-1 md:border-r border-border-main">
        <span type="text" name="cost" className="block w-full rounded-md border outline-transparent border-transparent focus:border focus:border-purple-600 focus:ring-purple-600 text-base md:text-sm md:text-center font-medium">
          {cost !== 0 ? numberFormatter(cost, 2, 2) : "0,00"}
        </span>
      </div>
      <div className="hidden md:flex items-center justify-center">
        {isEditMode ? (
          <button onClick={e => removeRow(index)}>
            <AiFillCloseCircle className="text-lg text-red-600 hover:text-red-700 flex items-center transition" />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Row;