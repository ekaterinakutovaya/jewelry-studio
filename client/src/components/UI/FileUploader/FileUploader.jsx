import React, {useRef} from "react";
import styles from "./FileUploader.module.scss";
import { FaRegFile } from "react-icons/fa";

const FileUploader = ({ onChange, inputRef, fileName }) => {
  const spanRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <button className={styles.button} onClick={handleClick}>
        <FaRegFile /> <span ref={spanRef}>{fileName}</span>
      </button>

      <input
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={onChange}
      />
    </>
  );
};

export default FileUploader;
