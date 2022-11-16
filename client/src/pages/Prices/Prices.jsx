import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import styles from "./Prices.module.scss";
import GemsPriceTable from "./GemsPriceTable/GemsPriceTable";
import MetallPriceTable from "./MetallPriceTable/MetallPriceTable";
import { fetchPrices } from "../../store/PricesSlice";

const Prices = () => {
  const [metall, setMetall] = useState([]);
  const {prices} = useSelector(state => state.prices);

  useEffect(() => {
    prices.map(item => {

      if (item.hallmark) {
        // console.log(item);
        setMetall(prevState => [...prevState, item]);
      }
      // });
    });

    return () => {
      setMetall([]);
    };
  }, [prices]);

  return (
    <div className="container-fluid my-5">
      <div className={styles.wrapper}>
        <div id="gems">
          <GemsPriceTable />
        </div>

        <div id="metall">
          <MetallPriceTable/>
        </div>
      </div>
    </div>
  );
};

export default Prices;
