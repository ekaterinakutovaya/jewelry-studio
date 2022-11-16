import axios from "axios";
import { API_URL } from "../utils/consts";

const createCalculation = (calculation, lastInsertId) => {

  function create(index) {
    if (index >= calculation.length) return;
   
    const formData = new FormData();
    formData.append("name", calculation[index].name);
    formData.append("hallmark", calculation[index].hallmark);
    formData.append("unit", calculation[index].unit);
    formData.append("size", calculation[index].size);
    formData.append("carat", calculation[index].carat);
    formData.append("qty", calculation[index].qty);
    formData.append("price", calculation[index].price);
    formData.append("price_id", +calculation[index].price_id);
    formData.append("order_id", +lastInsertId);
    formData.append("action", "create_calculation");

    return axios({
      method: "post",
      url: API_URL + `/index.php`,
      mode: "cors",
      data: formData,
      // config: {
      //   headers: { "Content-Type": "application/x-www-form-urlencoded" }
      // }
      config: { headers: { "Content-Type": "multipart/form-data" } }
    }).then(response => {
      create.call(this, index + 1);
    });
  }

  create.call(this, 0);
 
};

const fetchCalculationByID = id => {
  return axios.get(API_URL + `/fetch_calculation.php?order_id=${id}`);
};

const updateCalculation = (data, id) => {
  const formData = new FormData();
  formData.append("order_id", id);
  formData.append("action", "delete_calculation");

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    mode: "cors",
    data: formData,
    // config: {
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" }
    // }
    config: { headers: { "Content-Type": "multipart/form-data" } }
  }).then(() => {
    function create(index) {
      if (index >= data.length) return;

      const formData = new FormData();
      formData.append("name", data[index].name);
      formData.append("hallmark", data[index].hallmark);
      formData.append("unit", data[index].unit);
      formData.append("size", data[index].size);
      formData.append("carat", data[index].carat);
      formData.append("qty", data[index].qty);
      formData.append("price", data[index].price);
      formData.append("price_id", +data[index].price_id);
      formData.append("order_id", +id);
      formData.append("action", "create_calculation");

      return axios({
        method: "post",
        url: API_URL + `/index.php`,
        mode: "cors",
        data: formData,
        // config: {
        //   headers: { "Content-Type": "application/x-www-form-urlencoded" }
        // }
        config: { headers: { "Content-Type": "multipart/form-data" } }
      }).then(response => {
        create.call(this, index + 1);
      });
    }

    create.call(this, 0);
  });
};

const updatePricesInCalculation = (id, priceValue) => {
  // console.log(priceValue);
  const formData = new FormData();
  formData.append("price", priceValue);
  formData.append("price_id", +id);
  formData.append("action", "update_prices_in_calculation");

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    mode: "cors",
    data: formData,
    // config: {
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" }
    // }
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
}

const calculationService = {
  createCalculation,
  fetchCalculationByID,
  updateCalculation,
  updatePricesInCalculation
};

export default calculationService;
