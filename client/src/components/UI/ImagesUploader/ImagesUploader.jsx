import React from "react";
import styles from "./ImagesUploader.module.scss";
import { FaImages } from "react-icons/fa";

const ImagesUploader = ({ onChange, filesInputRef }) => {
  const handleClick = () => {
    filesInputRef.current.click();
  };

  return (
    <>
      <button className={styles.button} onClick={handleClick}>
        <FaImages /> <span>Выбрать фото</span>
      </button>

      <input
        type="file"
        multiple
        name="file[]"
        accept=".jpg,.jpeg,.png,.gif"
        style={{ display: "none" }}
        ref={filesInputRef}
        onChange={onChange}
      />
    </>
  );
};

export default ImagesUploader;
