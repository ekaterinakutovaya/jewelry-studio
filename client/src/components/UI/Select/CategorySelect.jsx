import React, { useEffect, useMemo } from "react";
import Select from "react-select";

const CategorySelect = ({ value, options, isDisabled = "true", onChange, defaultValue = {value: 0, label: "Заказы"} }) => {
  // const { orders, singleOrger, isSignleOrderLoaded } = useSelector(
  //   state => state.ordersState
  // );
  // const { category } = useSelector(state => state.filter);
  // const [selectedValue, setSelectedValue] = useState(defaultValue);
  

  const selectStyles = {
    control: (provided, state) => {
      const opacity = state.isDisabled ? 1 : 1;
      return {
        ...provided,
        // opacity,
        // color: state.isDisabled ? 'black' : 'black',
        minWidth: "115px",
        minHeight: "25px",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: "none",
        fontSize: "14px",
        textAlign: state.isDisabled ? 'center' : 'left',
        backgroundColor: defaultValue.color || "transparent",
        borderColor: state.isFocused ? "#b9a493" : "#dddddd",
        boxShadow: state.isFocused ? "#b9a493" : "#dddddd",
        "&:hover": {
          border: state.isFocused ? "1px solid #b9a493" : "1px solid #b9a493"
        }
      };
    },
    option: (provided, state) => ({
      ...provided,
      textAlign: "left",
      color: "inherit",
      backgroundColor: state.isFocused ? "#eae1df" : "#fff",
      boxShadow:
        "rgba(0, 0, 0, 0.1) 0px 10px 15px - 3px, rgba(0, 0, 0, 0.05) 0px 4px 6px - 2px"
    }),
    indicatorSeparator: state => ({
      display: "none"
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      padding: "0"
    }),
    menu: (provided, state) => ({
      ...provided,
      border: "1px solid #dddddd",
      borderTop: "none",
      borderRadius: "none",
      backgroundColor: "#f9f5f0",
      margin: "0",
      padding: "0"
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#4e5862",
      display: state.isDisabled ? "none" : "",
      "&:hover": {
        color: "#000"
      }
    }),
    singleValue: (provided, state) => {
      const color = state.isDisabled ? "hsl(0, 0 %, 100 %)" : "";
      const transition = "opacity 300ms";

      return { ...provided, color, transition };
    }
  };
  
  useEffect(() => {
    // console.log(defaultValue);

    // console.log(defaultValue);
    // // console.log(selectedValue);

    // setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleOnChange = (e) => {
    // setSelectedValue(e.value);  
    console.log(e.value);
    
  }

  return (
    <Select
      isDisabled={isDisabled}
      value={defaultValue}
      options={options}
      styles={selectStyles}
      onChange={onChange}
    />
  );
};

export default CategorySelect;