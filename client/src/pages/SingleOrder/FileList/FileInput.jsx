import React, {useRef, useState} from "react";
import { FaTimes } from "react-icons/fa";
import FileUploader from "components/UI/FileUploader/FileUploader";

import styles from "./FileItem.module.scss";

const FileInput = React.memo(({ removeFileInput, index, setFiles}) => {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("Выбрать файл");

  const handleChange = (e) => {
    setFileName(e.target.files[0].name);
    setFiles(prevState => [...prevState, e.target.files]);
  }

  const handleCancel = (e) => {
    removeFileInput(e, inputRef);
    setFileName("Выбрать файл");
  }

  return (
    <tr>
      <td>
        <FileUploader
          inputRef={inputRef}
          onChange={handleChange}
          fileName={fileName}
          setFileName={setFileName}
        />
      </td>
      <td>
        <button
          data-index={index}
          className={styles.cancel}
          onClick={handleCancel}
        >
          <FaTimes />
        </button>
      </td>
    </tr>
  );
});

export default FileInput;
