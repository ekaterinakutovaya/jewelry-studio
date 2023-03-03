import axios from "axios";
import { API_URL } from "../utils/consts";


const fetchPrices = () => {
  return axios.get(API_URL + `/fetch_prices.php`);
}

const updatePrice = ({priceValue, priceId}) => {
  const formData = new FormData();
  formData.append("priceValue", +priceValue);
  formData.append("priceId", +priceId);
  formData.append("action", 'update_price');

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
  
}


const PricesService = {
  fetchPrices,
  updatePrice
};

export default PricesService;