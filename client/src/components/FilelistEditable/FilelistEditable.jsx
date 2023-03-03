import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";

import File from "./File";
import FileInput from "./FileInput";
import { removeFile } from "@/store/FilesSlice";

let count = 0;

export const FilelistEditable = ({ files, setFilesToUpload, setFilesToDelete }) => {
  const dispatch = useDispatch();
  const { isEditMode } = useSelector(state => state.editMode);
  const [fileList, setFileList] = useState([]);
  const [fileInput, setFileInput] = useState([{ id: 0, fileInput: "" }]);
  

  useEffect(() => {
    if (files.length > 0) {
      setFileList([]);
      setFileList(files);
    }

    return () => {
      setFileList([]);
    };
  }, [files, isEditMode]);

  const removeExistingFile = index => {
    const list = [...fileList];

    list.splice(index, 1);
    setFileList(list);
    let fileToDelete = fileList.filter((obj, i) => i == index);
    dispatch(removeFile(fileToDelete[0].fileId))
    setFilesToDelete(prevState => [...prevState, fileToDelete[0]]);
  };

  const removeFileInput = (e, inputRef) => {
    const index = +e.currentTarget.dataset.index;
    const list = [...fileInput];

    if (list.length - 1 > 0) {
      const updatedList = list.filter((object, i) => i != index);
      setFileInput(updatedList);
      setFilesToUpload(prevState => prevState.filter((object, i) => i != index));
    } else {
      setFileInput([{ id: 0, fileInput: "" }]);
      inputRef.current.value = "";
      setFilesToUpload([]);
    }
  };

  const handleAddMore = () => {
    count++;
    setFileInput([...fileInput, { id: count, fileInput: "" }]);
  };

  return (
    <div role="list" className="divide-gray-200 rounded-md mt-2">
      {fileList.length ? (
        fileList.map((file, index) => (
          <File
            key={index}
            index={index}
            file={file}
            removeExistingFile={removeExistingFile}
          />
        ))
      ) : (
        <div className="mb-4">
          <FaMinusSquare className="text-red-500" />
        </div>
      )}

      <div className="pb-4"></div>

      {isEditMode &&
        fileInput &&
        fileInput.map((input, index) => (
          <FileInput
            input={input}
            key={input.id}
            index={index}
            removeFileInput={removeFileInput}
            setFilesToUpload={setFilesToUpload}
          />
        ))}

      {isEditMode ? (
        <div className="mt-4 lg:mt-2">
          <button onClick={handleAddMore}>
            <FaPlusSquare className="text-purple-600 text-lg lg:text-base" />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
