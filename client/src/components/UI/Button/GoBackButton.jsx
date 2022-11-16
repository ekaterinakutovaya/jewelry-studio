import React from "react";
import styles from "./GoBackButton.module.scss";

const GoBackButton = React.memo(({ handleGoBack }) => {
  return (
    <button className={styles.button} onClick={handleGoBack}>
      <svg className={styles.icon}>
        <use xlinkHref="#arrowBack" />
      </svg>
      <svg display="none">
        <symbol id="arrowBack" viewBox="0 0 1280.000000 1030.000000">
          <g transform="translate(0.000000,1030.000000) scale(0.100000,-0.100000)">
            <path
              d="M84 10286 c-66 -29 -98 -107 -72 -174 19 -48 6243 -10028 6277
-10065 54 -58 148 -58 202 0 23 25 6227 9924 6287 10031 52 92 -1 195 -106
209 -52 7 -73 -6 -184 -111 -51 -48 -1442 -1436 -3091 -3084 l-2998 -2996
-3092 3092 c-1779 1778 -3104 3096 -3120 3102 -37 13 -65 12 -103 -4z"
            />
          </g>
        </symbol>
      </svg>
    </button>
  );
});

export default GoBackButton;
