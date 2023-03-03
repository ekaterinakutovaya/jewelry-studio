import React from 'react';

export const ImagesUploadInput = ({ onChange, imagesInputRef }) => {

  return (
    <div>
      <input className="block w-full h-11 lg:h-auto rounded-md shadow-sm border border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm focus:outline-0 cursor-pointer
      file:mr-3 file:py-2 file:px-4 file:h-11 file:lg:h-auto
      file:rounded-l-md file:border-0 file:outline-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100" id="default_size" type="file" multiple
        ref={imagesInputRef}
        onChange={onChange}
      />
    </div>
  );
};
