import React from 'react';

import Row from "./Row";

export const Diamonds = ({ prices }) => {
  return (
    <div className="sm:block sm:rounded-xl sm:bg-white drop-shadow-xl">
      <div className="grid grid-cols-3 grid-rows-1  text-xs font-bold text-center p-4 bg-white border-b border-border-main rounded-t-xl">
        <div className="">Размер, мм.</div>
        <div className="">Цена, $</div>
        <div className="">Ред.</div>
      </div>

      {prices.map((item, index) => (
        <Row
          item={item}
          valueName={item.diamondSize}
          key={index}
        />
      ))}

      <div className="grid grid-cols-3 grid-rows-1 text-xs font-bold text-center p-4 bg-white border-b border-border-main rounded-b-xl"></div>
    </div>
  );
};
