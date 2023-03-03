import axios from "axios";
import { API_URL } from "../utils/consts";

const createOrder = ({ dataToAdd }) => {
  const formData = new FormData();
  formData.append("orderName", dataToAdd.orderName);
  formData.append("customer", dataToAdd.customer);
  formData.append("receiveDate", dataToAdd.receiveDate);
  formData.append("handoverDate", dataToAdd.handoverDate);
  formData.append("priceStart", dataToAdd.priceStart);
  formData.append("priceMiddle", dataToAdd.priceMiddle);
  formData.append("priceFinal", dataToAdd.priceFinal);
  formData.append("urgencyIndex", +dataToAdd.urgencyIndex);
  formData.append("catIndex", +dataToAdd.catIndex);
  formData.append("categoryName", dataToAdd.categoryName);
  formData.append("statIndex", +dataToAdd.statIndex);
  formData.append("statusName", dataToAdd.statusName);
  formData.append("statusRate", +dataToAdd.statusRate);
  formData.append("hallmark", dataToAdd.hallmark);
  formData.append("metallColor", dataToAdd.metallColor);
  formData.append("earParams", dataToAdd.earParams);
  formData.append("ringSize", dataToAdd.ringSize);
  formData.append("comments", dataToAdd.comments);
  formData.append("isFileExists", +dataToAdd.isFileExists);
  formData.append("action", "create_order");

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
};


const quickUpdate = data => {
  const formData = new FormData();
  formData.append("orderId", data.orderId);
  formData.append("handoverDate", data.handoverDate);
  formData.append("catIndex", data.catIndex);
  formData.append("categoryName", data.categoryName);
  formData.append("statIndex", data.statIndex);
  formData.append("statusName", data.statusName);
  formData.append("statusRate", data.statusRate);
  formData.append("urgencyIndex", data.urgencyIndex);
  formData.append("action", "quick_update");

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    credentials: "include",
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
};

const updateOrder = data => {
  const formData = new FormData();
  formData.append("orderId", +data.orderId);
  formData.append("orderName", data.orderName);
  formData.append("customer", data.customer);
  formData.append("receiveDate", data.receiveDate);
  formData.append("handoverDate", data.handoverDate);
  formData.append("priceStart", data.priceStart);
  formData.append("priceMiddle", data.priceMiddle);
  formData.append("priceFinal", data.priceFinal);
  formData.append("urgencyIndex", data.urgencyIndex);
  formData.append("catIndex", data.catIndex);
  formData.append("categoryName", data.categoryName);
  formData.append("statIndex", data.statIndex);
  formData.append("statusName", data.statusName);
  formData.append("statusRate", +data.statusRate);
  formData.append("hallmark", data.hallmark);
  formData.append("metallColor", data.metallColor);
  formData.append("earParams", data.earParams);
  formData.append("ringSize", data.ringSize);
  formData.append("comments", data.comments);
  formData.append("action", "update_order");

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
};


const deleteOrder = orderId => {
  const formData = new FormData();
  formData.append("orderId", orderId);
  formData.append("action", "delete_order");

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  })
};

const search = (searchValue) => {
  const formData = new FormData();
  formData.append("search_value", searchValue);
  formData.append("action", "search_order");

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  })
}

const sendToCutting = (id, image) => {
  const formData = new FormData();
  formData.append("orderId", +id);
  formData.append("order_image", image);
  formData.append("action", "send_to_cutting");

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  })
  
}

const orderStatusUpdate = id => {
  const formData = new FormData();
  formData.append("orderId", +id);
  formData.append("action", "update_status");

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  })
};

const ordersService = {
  createOrder,
  quickUpdate,
  updateOrder,
  deleteOrder,
  search,
  sendToCutting,
  orderStatusUpdate
};

export default ordersService;
