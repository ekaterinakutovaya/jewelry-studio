import React from 'react';
import classNames from "classnames";
import "./Button.scss";

const Button = ({ onClick, type, children, width, margin }) => {
    const btnClass = classNames({
      btn: true,
      "btn--light": type == "light",
      "btn--dark": type == "dark",
      "w-100": width == 'w100',
      "mx-4": margin == 'mx-4',
      "my-4": margin == 'my-4',
    });

    return (
        <button
            className={btnClass}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;