import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";

import styles from "./FileItem.module.scss";


const FileItem = React.memo(({ file, isDisabled, removeExistingFile, index }) => {

  return (
    <tr>
      <td className={styles.file}>
        <Link
          to={`../assets/uploads/files/${file.file_unique_name}`}
          target="_blank"
          download={file.file_name}
          className={styles.link}
        >
          {file.file_name}
        </Link>
      </td>
      {!isDisabled ? (
        <td className={styles.remove}>
          <button onClick={e => removeExistingFile(index)} className={styles.removeBtn}>
            <AiFillCloseCircle className={styles.removeIcon} />
          </button>
        </td>
      ) : (
        ""
      )}
    </tr>
  );
});

export default FileItem;
