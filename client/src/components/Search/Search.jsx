import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './Search.module.scss';
import { setSearchValue } from "../../store/FilterSlice";
import debounce from "lodash.debounce";

const Search = () => {
    const dispatch = useDispatch();
    const {category} = useSelector(state => state.filter);
    const [value, setValue] = useState('');
    const inputRef = useRef();

    useEffect(() => {
      dispatch(setSearchValue(""));
      setValue("");
    }, [category])

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 150),
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
      <div className={styles.root}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Поиск..."
          className={styles.input}
          value={value}
          onChange={onChangeInput}
        />
        {value && (
          <svg
            onClick={clearInput}
            className={styles.clearIcon}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        )}
      </div>
    );
};

export default Search;