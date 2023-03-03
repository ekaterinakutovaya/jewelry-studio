import React from 'react';
import { Link } from "react-router-dom";
import { PaperClipIcon } from '@heroicons/react/20/solid'

export const Filelist = ({ files }) => {
 
  return (
    <ul role="list" className="divide-gray-200 rounded-md border border-gray-200">
      {files && files.map(file => (
        <li key={file.fileId} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
            <div className="flex items-center">
            <Link
              to={`../assets/uploads/files/${file.fileUniqueName}`}
              target="_blank"
              download={file.fileName}
              className="flex items-center hover:opacity-75 transition-opacity"
            >
              <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <span className="ml-2 truncate">{file.fileName}</span>
            </Link>
            </div>
          
        </li>
      ))}
    </ul>
  );
};
