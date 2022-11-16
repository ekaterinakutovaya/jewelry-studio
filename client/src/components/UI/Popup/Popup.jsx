import React from 'react';
import styles from "./Popup.module.scss";

const Popup = ({ children, visible, setVisible }) => {
  const rootClasses = [styles.popup];

  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div className={styles.popupContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Popup;