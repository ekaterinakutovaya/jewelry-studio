import React, { useEffect, useState, useLayoutEffect } from "react";
import { FaMinusSquare } from "react-icons/fa";
import { AiOutlinePlusSquare } from "react-icons/ai";
import FileItem from "./FileItem";
import FileInput from "./FileInput";


import styles from "./FileList.module.scss";

let count = 0;

const FileList = React.memo(({
  title,
  files,
  isDisabled,
  setFiles,
  setFilesToDelete
}) => {
  const [fileList, setFileList] = useState([]);
  const [fileInput, setFileInput] = useState([{ id: 0, file_input: "" }]);

  useLayoutEffect(() => {    
    if (files.length > 0) {
      setFileList(files);
    }

    return () => {
      setFileList([]);
      setFileInput([{ id: 0, file_input: "" }]);
    };
  }, [files]);

  // useEffect(() => {
  //   // console.log('filelist render');
    
  //   if (files.length > 0) {
  //     setFileList(files);
  //   }

  //   return () => {
  //     setFileList([]);
  //     setFileInput([{ id: 0, file_input: "" }]);
  //   };
  // }, [files]);

  const removeExistingFile = index => {
    // console.log(index);
    
    const list = [...fileList];

    list.splice(index, 1);
    // console.log(list.splice(index, 1));

    setFileList(list);
    // setFileList(prevState => [...prevState, list]);

    let fileToDelete = fileList.filter((obj, i) => i == index);

    setFilesToDelete(prevState => [...prevState, fileToDelete[0]]);
  };

  const removeFileInput = (e, inputRef) => {
    const index = +e.currentTarget.dataset.index;
    const list = [...fileInput];

    if (list.length - 1 > 0) {
      const updatedList = list.filter((object, i) => i != index);

      setFileInput(updatedList);
      setFiles(prevState => prevState.filter((object, i) => i != index));
    } else {
      setFileInput([{ id: 0, file_input: "" }]);
      inputRef.current.value = "";
      setFiles([]);
    }
  };

  const handleAddMore = () => {
    count++;
    setFileInput([...fileInput, { id: count, file_input: "" }]);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <label htmlFor="">{title}</label>
          </th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {fileList.length !== 0 ? (
          fileList.map((file, index) => (
            <FileItem
              key={index}
              index={index}
              file={file}
              isDisabled={isDisabled}
              removeExistingFile={removeExistingFile}
            />
          ))
        ) : (
          <tr>
            <td>
              <FaMinusSquare className={styles.minus} />
            </td>
          </tr>
        )}

        <tr>
          <td></td>
        </tr>

        {!isDisabled &&
          fileInput &&
          fileInput.map((input, index) => (
            <FileInput
              input={input}
              key={input.id}
              index={index}
              removeFileInput={removeFileInput}
              setFiles={setFiles}
            />
          ))}

        {!isDisabled ? (
          <tr>
            <td>
              <button onClick={handleAddMore}>
                <AiOutlinePlusSquare />
              </button>
            </td>
          </tr>
        ) : (
          ""
        )}
      </tbody>
    </table>
  );
});

export default FileList;
