import axios from "axios";
import { API_URL } from "../utils/consts";
import { toast } from "react-toastify";

const createOrder = ({ data }) => {
  const formData = new FormData();
  formData.append("order_name", data.order_name);
  formData.append("customer", data.customer);
  formData.append("receive_date", data.receive_date);
  formData.append("handover_date", data.handover_date);
  formData.append("price_1", data.price1);
  formData.append("price_2", data.price2);
  formData.append("price_3", data.price3);
  formData.append("urgency", +data.urgencyIndex);
  formData.append("cat_index", +data.catIndex);
  formData.append("category_name", data.categoryName);
  formData.append("stat_index", +data.statIndex);
  formData.append("status_name", data.statusName);
  formData.append("status_rate", +data.statusRate);
  formData.append("hallmark", data.hallmark);
  formData.append("metall_color", data.metallColor);
  formData.append("ear_params", data.earParams);
  formData.append("ring_size", data.ringSize);
  formData.append("comments", data.comments);
  formData.append("is_file_exists", +data.isFileExists);
  formData.append("action", "create_order");

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
};

const uploadImages = (imagesToUpload, lastInsertId) => {
  const formData = new FormData();
  imagesToUpload.map(file => {
    formData.append("file[]", file);
    formData.append("order_id", +lastInsertId);
    formData.append("action", "upload_order_images");
  });

  return axios({
    method: "post",
    url: API_URL + "/order_images_upload.php",
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
};

const uploadRhinoFiles = (rhino, lastInsertId) => {

  function upload(index) {
    if (index >= rhino.length) return;

    const formData = new FormData();
    formData.append("rhino_file", rhino[index][0]);
    formData.append("order_id", +lastInsertId);
    formData.append("action", "rhino_files_upload");

    return axios({
      method: "post",
      url: API_URL + `/index.php`,
      mode: "cors",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    }).then(response => {
      upload.call(this, index + 1);
    });
  }
  upload.call(this, 0);
};

const uploadCuttingFiles = (cutFiles, lastInsertId) => {

  function upload(index) {
    if (index >= cutFiles.length) return;

    const formData = new FormData();
    formData.append("cutting_file", cutFiles[index][0]);
    formData.append("order_id", +lastInsertId);
    formData.append("action", "cutting_files_upload");

    axios({
      method: "post",
      url: API_URL + `/index.php`,
      mode: "cors",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    }).then(response => {
      upload.call(this, index + 1);
    });
  }
  upload.call(this, 0);
};

const fetchOrdersByCategory = category => {
  fetch(
    API_URL + `/fetch_orders.php?${
      category !== null ? `category=${category}` : ""
    }`
  ).then(({ data }) => {
    let orders = data.data.filter(
      (elem, index, self) =>
        self.findIndex(t => {
          return t.order_id === elem.order_id;
        }) === index
    );

    fetch(`http://juliyaserver/fetch_cutting_files.php`).then(({ data }) => {
      const files = data.data;

      let sortedFiles = files.filter(item1 =>
        orders.some(item2 => item1.order_id == item2.order_id)
      );

      orders.forEach((order, index) => {
        sortedFiles.forEach(file => {
          if (order.order_id == file.order_id) {
            order.fileExists = true;
          }
        });
      });
    });
  });
};

const quickUpdate = data => {
  const formData = new FormData();
  formData.append("order_id", data.order_id);
  formData.append("handover_date", data.handover_date);
  formData.append("cat_index", data.cat_index);
  formData.append("category_name", data.category_name);
  formData.append("stat_index", data.stat_index);
  formData.append("status_name", data.status_name);
  formData.append("status_rate", data.status_rate);
  formData.append("urgency", data.urgency);
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

const fetchOrderByID = id => {
  return axios.get(API_URL + `/fetch_order_by_id.php?order_id=${id}`);
};

const updateOrder = data => {
  const formData = new FormData();
  formData.append("order_id", +data.id);
  formData.append("order_name", data.orderName);
  formData.append("customer", data.customer);
  formData.append("receive_date", data.receiveDateInput);
  formData.append("handover_date", data.handoverDateInput);
  formData.append("price_1", data.price1);
  formData.append("price_2", data.price2);
  formData.append("price_3", data.price3);
  formData.append("urgency", +data.urgencyIndex);
  formData.append("cat_index", +data.catIndex);
  formData.append("category_name", data.categoryName);
  formData.append("stat_index", +data.statIndex);
  formData.append("status_name", data.statusName);
  formData.append("status_rate", +data.statusRate);
  formData.append("hallmark", data.hallmark);
  formData.append("metall_color", data.metallColor);
  formData.append("ear_params", data.earParams);
  formData.append("ring_size", data.ringSize);
  formData.append("comments", data.comments);
  formData.append("is_file_exists", +data.isFileExists);
  formData.append("action", "update_order");

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
};

const deleteImages = imagesToDelete => {
  const formData = new FormData();
  imagesToDelete.map(image => {

    formData.append("image_id", +image[0].image_id);
    formData.append("image_src", image[0].image_src);
    formData.append("image_min", image[0].image_min);
    formData.append("action", "delete_image");

    return axios({
      method: "post",
      url: API_URL + `/index.php`,
      mode: "cors",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    });
  });
};

const deleteRhinoFiles = rhinoFilesToDelete => {
  const formData = new FormData();
  rhinoFilesToDelete.map(file => {

    formData.append("file_id", +file.file_id);
    formData.append("file_unique_name", file.file_unique_name);
    formData.append("action", "delete_rhino_file");

    return axios({
      method: "post",
      url: API_URL + `/index.php`,
      mode: "cors",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    });
  });
};

const deleteCuttingFiles = cuttingFilesToDelete => {
  const formData = new FormData();
  cuttingFilesToDelete.map(file => {
    formData.append("file_id", +file.file_id);
    formData.append("file_unique_name", file.file_unique_name);
    formData.append("action", "delete_cutting_file");

    return axios({
      method: "post",
      url: API_URL + `/index.php`,
      mode: "cors",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    });
  });
};

const deleteOrder = id => {

  const formData = new FormData();
  formData.append("order_id", id);
  formData.append("action", "delete_order");

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  }).then(() => {
    toast.success("Запись удалена!", {
      position: toast.POSITION.TOP_CENTER
    });
  });
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

const sendToFraser = (id, image) => {
  const formData = new FormData();
  formData.append("order_id", +id);
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

const fraserStatusUpdate = id => {
  const formData = new FormData();
  formData.append("order_id", +id);
  formData.append("action", "update_fraser_status");

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
  uploadImages,
  uploadRhinoFiles,
  uploadCuttingFiles,
  fetchOrdersByCategory,
  quickUpdate,
  updateOrder,
  fetchOrderByID,
  deleteImages,
  deleteOrder,
  deleteRhinoFiles,
  deleteCuttingFiles,
  search,
  sendToFraser,
  fraserStatusUpdate
};

export default ordersService;
