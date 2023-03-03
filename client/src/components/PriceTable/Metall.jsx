import React from 'react';

import Row from "./Row";

export const Metall = ({ prices }) => {
  // console.log(prices);

  return (
    <div className="block rounded-xl bg-white drop-shadow-xl">
      <div className="grid grid-cols-3 grid-rows-1 text-xs font-bold text-center p-4 bg-white border-b border-border-main rounded-t-xl">
        <div className="">Проба</div>
        <div className="">Цена, $</div>
        <div className="">Ред.</div>
      </div>

      {prices.map((item, index) => (
        <Row
          item={item}
          valueName={item.materialName}
          key={index}
        />
      ))}

      <div className="grid grid-cols-3 grid-rows-1 text-xs font-bold text-center p-4 bg-white border-b border-border-main rounded-b-xl">

      </div>
    </div>
  );
};
