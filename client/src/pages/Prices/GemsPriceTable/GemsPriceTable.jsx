import React, {useEffect, useState} from "react";
import { useSelector } from 'react-redux';
import styles from "./GemsPriceTable.module.scss";
import TableRow from "./TableRow";


const GemsPriceTable = () => {
  const { prices } = useSelector(state => state.prices);
  const [gems, setGems] = useState([]);

  useEffect(() => {
    prices.map((item) => {
      if (item.diamond_size) {
        // console.log(typeof +item.diamond_size);
        
        setGems(prevState => [...prevState, item]);
      }
    })    

    return () => {
      setGems([]);
    }
    
  }, [])

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Камни</th>
          <th>Размер, мм</th>
          <th>Цена, $</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {gems && gems.map((item, index) => (
          <TableRow key={index} item={item} id={item.price_id}/>
        ))}
        
      </tbody>
    </table>
  );
};

export default GemsPriceTable;
