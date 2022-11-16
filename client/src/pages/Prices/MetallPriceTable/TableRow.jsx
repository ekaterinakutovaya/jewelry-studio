import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./MetallPriceTable.module.scss";
import ActionButton from "components/UI/Button/ActionButton";
import { updatePrice } from "store/PricesSlice";
import { FaPencilAlt, FaTimes, FaSave } from "react-icons/fa";
import PricesService from "services/prices.service";
import calculationService from "services/calculation.service";
import { numberFormatter } from "utils/utils";

const TableRow = ({ item, id }) => {
  const dispatch = useDispatch();
  const [editedPriceId, setEditedPriceId] = useState(null);
  const [priceValue, setPriceValue] = useState(0);
  const [isPriceEditing, setIsPriceEditing] = useState(false);

  useEffect(() => {
      // setPriceValue(numberFormatter(item.price_value, 2, 2));
      setPriceValue(+item.price_value);
  }, []);

  const handleEdit = e => {
    setEditedPriceId(e.currentTarget.id);
  };

  const handlePriceChange = e => {
    setPriceValue(e.target.value);
    dispatch(updatePrice({ value: +e.target.value, id: id }));
  };

  const handleSave = () => {
    PricesService.updatePrice({ id: id, value: priceValue });
    setEditedPriceId(null);
    // setPriceValue(prevState => numberFormatter(prevState, 2, 2));
    calculationService.updatePricesInCalculation(id, priceValue);
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

  const handleCancel = () => {
    setEditedPriceId(null);
    setIsPriceEditing(false);
  };

  return (
    <tr>
      <td>{item.material_name}</td>
      <td>
        {isPriceEditing ? (
          <input
            type="number"
            name="price"
            className={editedPriceId === null ? styles.input : styles.inputActive}
            value={priceValue}
            onChange={handlePriceChange}
            onBlur={togglePriceEditing}
            disabled={editedPriceId === null ? true : false}
          />
        ) : (
            <input
              type="text"
              name="price"
              className={editedPriceId === null ? styles.input : styles.inputActive}
              value={priceValue != "" ? numberFormatter(priceValue, 2, 2) : ""}
              onChange={handlePriceChange}
              onFocus={togglePriceEditing}
              readOnly
              disabled={editedPriceId === null ? true : false}
            />
          )}
        {/* <input
          name="price"
          type="number"
          className={editPriceId === null ? styles.input : styles.inputActive}
          value={priceValue}
          onChange={handlePriceChange}
          disabled={editPriceId === null ? true : false}
        /> */}
      </td>
      <td>
        {editedPriceId === item.price_id ? (
          <div className={styles.wrapper}>
            <ActionButton onClick={handleSave} id={item.price_id}>
              <FaSave className={styles.save} />
            </ActionButton>
            <button className={styles.cancel} onClick={handleCancel}>
              <FaTimes />
            </button>
          </div>
        ) : (
          <ActionButton onClick={handleEdit} id={item.price_id}>
            <FaPencilAlt className={styles.edit} />
          </ActionButton>
        )}
      </td>
    </tr>
  );
};

export default TableRow;