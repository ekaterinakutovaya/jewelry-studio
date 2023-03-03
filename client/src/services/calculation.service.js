import axios from "axios";
import { API_URL } from "../utils/consts";

const createCalculation = (calculationData, orderId) => {

  function create(index) {
    if (index >= calculationData.length) return;

    const formData = new FormData();
    formData.append("name", calculationData[index].name);
    formData.append("hallmark", calculationData[index].hallmark);
    formData.append("unit", calculationData[index].unit);
    formData.append("size", calculationData[index].size);
    formData.append("carat", calculationData[index].carat);
    formData.append("qty", calculationData[index].qty);
    formData.append("price", calculationData[index].price);
    formData.append("priceId", +calculationData[index].priceId);
    formData.append("orderId", +orderId);
    formData.append("action", "create_calculation");

    return axios({
      method: "post",
      url: API_URL + `/index.php`,
      mode: "cors",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
    .then(response => {
      create.call(this, index + 1);
    });
  }

  create.call(this, 0);

};

const fetchCalculations = () => {
  return axios.get(API_URL + `/fetch_calculation.php`);
};

const fetchCalculationByID = id => {
  return axios.get(API_URL + `/fetch_calculation.php?orderId=${id}`);
};

// const updateCalculation = async (data, orderId) => {
//   console.log(+orderId);
  
//   const formData = new FormData();
//   formData.append("orderId", +orderId);
//   formData.append("action", "delete_calculation");

//  await axios({
//     method: "post",
//     url: API_URL + `/index.php`,
//     mode: "cors",
//     data: formData,
//     config: { headers: { "Content-Type": "multipart/form-data" } }
//   })
//     .then((response) => {
//       console.log(response);
      
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("hallmark", data.hallmark);
//       formData.append("unit", data.unit);
//       formData.append("size", data.size);
//       formData.append("carat", data.carat);
//       formData.append("qty", data.qty);
//       formData.append("price", data.price);
//       formData.append("priceId", +data.priceId);
//       formData.append("orderId", +orderId);
//       formData.append("action", "create_calculation");

//       return axios({
//         method: "post",
//         url: API_URL + `/index.php`,
//         mode: "cors",
//         data: formData,
//         config: { headers: { "Content-Type": "multipart/form-data" } }
//       })
//     })

// }
const updateCalculation = (calculationData, orderId) => {
  const formData = new FormData();
  formData.append("orderId", +orderId);
  formData.append("action", "delete_calculation");

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  })
.then(() => {
    function create(index) {
      if (index >= calculationData.length) return;

      const formData = new FormData();
      formData.append("name", calculationData[index].name);
      formData.append("hallmark", calculationData[index].hallmark);
      formData.append("unit", calculationData[index].unit);
      formData.append("size", calculationData[index].size);
      formData.append("carat", calculationData[index].carat);
      formData.append("qty", calculationData[index].qty);
      formData.append("price", calculationData[index].price);
      formData.append("priceId", +calculationData[index].priceId);
      formData.append("orderId", +orderId);
      formData.append("action", "create_calculation");

      return axios({
        method: "post",
        url: API_URL + `/index.php`,
        mode: "cors",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      })
.then(response => {
        create.call(this, index + 1);
      });
    }

    create.call(this, 0);
  });
};

const updatePricesInCalculation = (priceId, priceValue) => {
  console.log(priceValue);
  
  const formData = new FormData();
  formData.append("price", priceValue);
  formData.append("priceId", +priceId);
  formData.append("action", "update_prices_in_calculation");

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
}

const calculationService = {
  createCalculation,
  fetchCalculations,
  fetchCalculationByID,
  updateCalculation,
  updatePricesInCalculation
};

export default calculationService;
