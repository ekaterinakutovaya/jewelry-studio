import React from "react";
import styles from "./DownloadFiles.module.scss";
import { Link } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { FaDownload } from "react-icons/fa";

const DownloadFiles = ({ setVisible, files }) => {
  return (
    <div className={styles.wrapper}>
      <GrClose className={styles.close} onClick={() => setVisible(false)} />
      <div className={styles.content}>
        {files &&
          files.map((file, index) => (
            <div key={index} className={styles.item}>
              <FaDownload className={styles.download} />
              <Link
                to={`../assets/uploads/files/${file.file_unique_name}`}
                target="_blank"
                download={file.file_name}
                className={styles.link}
              >
                {file.file_name}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DownloadFiles;
