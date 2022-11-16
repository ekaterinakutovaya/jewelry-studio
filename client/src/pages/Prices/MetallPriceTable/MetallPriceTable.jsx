import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./MetallPriceTable.module.scss";
import TableRow from "./TableRow";

const MetallPriceTable = () => {
  const { prices } = useSelector(state => state.prices);
  const [metall, setMetall] = useState([]);

  useEffect(() => {
    prices.map((item) => {
      if (item.hallmark) {
        setMetall(prevState => [...prevState, item]);
      }
    })

    return () => {
      setMetall([]);
    }

  }, [])

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Металл</th>
          <th>Цена, $</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {metall &&
          metall.map((item, index) => (
            <TableRow key={index} item={item} id={item.price_id}/>
          ))}
      </tbody>
    </table>
  );
};

export default MetallPriceTable;
