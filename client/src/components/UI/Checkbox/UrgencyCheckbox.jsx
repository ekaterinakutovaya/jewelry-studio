import React, { useState, useEffect} from "react";
import Checkbox from "react-custom-checkbox";
import { FaCheck } from "react-icons/fa";

const UrgencyCheckbox = ({ urgencyIndex, setUrgencyIndex }) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  
  useEffect(() => {
    switch (urgencyIndex) {
      case 1:
        setChecked1(!checked1);
        break;
      case 2:
        setChecked2(!checked2);
        break;
    }
  }, []);

  const handleCheckbox1 = e => {
    setUrgencyIndex(3);
    setChecked1(!checked1);
    setChecked2(false);
  
    if (!checked1 == true) {
      setUrgencyIndex(prevState => (prevState = 1));
    } 
  };
  const handleCheckbox2 = e => {
    setUrgencyIndex(3);
    
    setChecked2(!checked2);
    setChecked1(false);

    if (!checked2 == true) {
      setUrgencyIndex(prevState => (prevState = 2));
    }
  };

  return (
    <div>
      <Checkbox
        icon={<FaCheck color="#174A41" size={12} />}
        borderColor="#dddddd"
        borderRadius="0"
        style={{ cursor: "pointer", marginBottom: "5px", opacity: "1" }}
        labelStyle={{
          marginLeft: 5,
          userSelect: "none",
          fontSize: "14px"
        }}
        label="Срочный"
        checked={checked2}
        onChange={handleCheckbox2}
      />

      <Checkbox
        icon={<FaCheck color="#174A41" size={12} />}
        borderColor="#dddddd"
        borderRadius="0"
        style={{ cursor: "pointer" }}
        labelStyle={{ marginLeft: 5, userSelect: "none", fontSize: "14px" }}
        label="Очень срочный"
        checked={checked1}
        onChange={handleCheckbox1}
      />
    </div>
  );
};

export default UrgencyCheckbox;
