import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PaperClipIcon } from '@heroicons/react/20/solid';
import { AiFillCloseCircle } from "react-icons/ai";

const File = ({ file, removeExistingFile, index }) => {
  const { isEditMode } = useSelector(state => state.editMode);
  const fileNameArr = file.fileName.split('.');

  return (
    
    <div key={index} className="w-full flex justify-between items-center mb-3 grid grid-cols-[85%,15%] ">
      <div className="flex items-center">
        <Link
          to={`../assets/uploads/files/${file.fileUniqueName}`}
          target="_blank"
          download={file.fileName}
          className="w-full flex items-center hover:opacity-75 transition-opacity text-sm"
        >
          <PaperClipIcon className="h-6 w-6 flex-shrink-0 text-gray-500" aria-hidden="true" />
          
          <div className="text-ellipsis-middle ml-2">
            <div>{fileNameArr[0]}</div>
            <div>.{fileNameArr[1]}</div>
          </div>
      
        </Link>
      </div>

      {isEditMode ? (
        <div className="flex justify-end items-center">
          <button onClick={e => removeExistingFile(index)} >
            <AiFillCloseCircle className="text-red-500 text-lg lg:text-base hover:opacity-70 transition duration-150 ease-out hover:ease-in"/>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default File;