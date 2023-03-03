import React, { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";


const FileInput = ({ removeFileInput, index, setFilesToUpload }) => {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("Обзор...");
  

  const handleChange = (e) => {
    if (e.target.files[0].type == 'application/x-msdownload') {
      toast.error(`Файл ${e.target.files[0].name} имеет недопустимый формат!`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000
      });
      return;
    }
    
    setFileName(e.target.files[0].name);
    setFilesToUpload(prevState => [...prevState, e.target.files]);
  }

  const handleCancel = (e) => {
    removeFileInput(e, inputRef);
    setFileName("Обзор...");
  }

  return (
    <div className="mb-2 grid grid-cols-[90%,10%]">
      <input className="block h-11 lg:h-auto rounded-md shadow-sm border border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm focus:outline-0 cursor-pointer mr-2 pr-2
      file:mr-3 file:py-2 file:px-4 file:h-11 file:lg:h-auto
      file:rounded-l-md file:border-0 file:outline-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100" type="file"
        ref={inputRef}
        onChange={handleChange}
        // accept=".txt"
      />
      
      <div className="flex justify-end items-center">
        <button
          data-index={index}
          onClick={handleCancel}
        >
          <FaTimes className="text-lg lg:text-base" />
        </button>
      </div>

    </div>
  );
};

export default FileInput;