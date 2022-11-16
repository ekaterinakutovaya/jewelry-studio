import React, { useState } from "react";

import styles from "./Checkbox.module.scss";

const Checkbox = ({values, setValues}) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxHandler = e => {
    setIsChecked(!isChecked);

    setValues({
      ...values,
      isChecked: !isChecked
    });
  };

  return (
    <label>
      <input name="checkbox" type="checkbox" onChange={checkboxHandler} />
      <svg
        className={
          isChecked ? `${styles.checkbox} ${styles.active}` : styles.checkbox
        }
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke={isChecked ? "#fff" : "none"}
        />
      </svg>
    </label>
  );
};

export default Checkbox;
