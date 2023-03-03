import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { XMarkIcon } from '@heroicons/react/24/outline';

import { setSearchValue } from "@/store/FilterSlice";

export const Search = () => {

  const dispatch = useDispatch();
  const { category } = useSelector(state => state.filter);
  const [value, setValue] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    dispatch(setSearchValue(""));
    setValue("");
  }, [category])

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 300),
    [],
  );

  const clearInput = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  }

  const onChangeInput = e => {
    setValue(e.target.value);
    updateSearchValue(e.target.value.toLowerCase());
  }


  return (
    <div className="relative sm:text-center order-0 md:order-1 w-full sm:w-auto md:w-auto md:mb-3 mb-6 md:mb-0 ">
      <input
        type="text"
        ref={inputRef}
        placeholder="Поиск..."
        className="relative rounded-md border border-gray-300 bg-white py-4 md:py-2 text-sm shadow-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 w-full sm:w-80"
        value={value}
        onChange={onChangeInput}
      />
      {value && (
        <button type="button" onClick={clearInput}
          className="w-5 h-5 text-purple-600 hover:opacity-75 absolute right-2.5 top-2/4 translate-y-[-50%]" aria-hidden="true"
          data-bs-dismiss="modal" aria-label="Close"> <XMarkIcon />
        </button>
      )}
    </div>
  );
};
