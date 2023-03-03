import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { FaPencilAlt, FaSave, FaTimes } from "react-icons/fa";

import { numberFormatter, setGemsPrice, setMetallPrice } from "@/utils/utils";
import { updatePrice } from "@/store/PricesSlice";
import calculationService from "@/services/calculation.service";

import { QuickEditButtons } from "@/components/QuickEditButtons";
import { Button } from "@/components/Button";

const Row = ({ item, valueName }) => {
  const dispatch = useDispatch();
  const { priceId } = item;
  const [editedPriceId, setEditedPriceId] = useState(null);
  const [priceValue, setPriceValue] = useState(0);
  const [isPriceEditing, setIsPriceEditing] = useState(false);
  
  useEffect(() => {
    setPriceValue(+item.priceValue);
  }, [isPriceEditing])

  const editModeHandler = () => {
    setIsPriceEditing(true);
  };

  const cancelEditModeHandler = e => {
    setIsPriceEditing(false);
  };

  const togglePriceEditing = () => {
    if (priceValue === 0) {
      setPriceValue({
        ...priceValue,
        price: ""
      });
    }
    setIsPriceEditing(!isPriceEditing);
  };

  const inputChangeHandler = (e) => {
    setPriceValue(e.target.value);
  }

  
  const saveHandler = () => {
    calculationService.updatePricesInCalculation(priceId, priceValue);
    dispatch(updatePrice({ priceValue, priceId }))
      .then(() => {
        setIsPriceEditing(false);
      })
  }


  return (
    <div className="grid grid-cols-3 grid-rows-1 text-xs md:p-4 md:mb-0 bg-white border-b border-border-main py-3">
      <div className="flex justify-center items-center border-r border-border-main">
        {valueName}
      </div>

      <div className="w-full flex justify-center items-center border-r border-border-main">
        {isPriceEditing ? (
          <input
            type="number"
            name="priceValue"
            className="block w-3/4 md:w-1/2 my-0 mx-auto text-center rounded-md border-2 border-purple-600 focus:border-2 focus:border-purple-600 focus:ring-transparent text-sm"
            value={priceValue}
            onChange={(e) => setPriceValue(e.target.value)}
          />
        ) : (
          <input
            type="text"
            name="priceValue"
            className="block w-3/4 md:w-1/2 my-0 mx-auto text-center rounded-md border-2 outline-transparent border-transparent focus:border focus:border-purple-600 focus:ring-purple-600 text-sm"
            value={
              priceValue !== "" ? numberFormatter(priceValue, 2, 2) : ""
            }
            onChange={inputChangeHandler}
            onFocus={togglePriceEditing}
            readOnly
            disabled
          />
        )}
      </div>

      <div className="px-3">
        {isPriceEditing ? (
          <>
            <div className="sm:w-1/2 my-0 mx-auto flex items-center justify-around col-span-2 md:order-10">
              <Button type="icon-sm" onClick={saveHandler}>
                <FaSave className="text-base " />
              </Button>

              <button className="text-base xl:text-base text-slate-800 hover:text-slate-600" onClick={cancelEditModeHandler}>
                <FaTimes />
              </button>
            </div>
          </>
        ) : (

          <div className="flex items-center justify-center order-10 md:order-11">
            <Button type="icon-sm" onClick={editModeHandler}>
                <FaPencilAlt className="text-base " />
            </Button>
          </div>

        )}
      </div>
    </div>
  );
};

export default Row;