import axios from "axios";
import { API_URL } from "../utils/consts";


const uploadImages = (image, orderId) => {
    // console.log(image);
        
    const formData = new FormData();
        formData.append("file[]", image);
        formData.append("orderId", +orderId);

    return axios({
        method: "post",
        url: API_URL + "/image_upload.php",
        mode: "cors",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
    });
};

const deleteImages = imagesToDelete => {
    // console.log(imagesToDelete);
    
    const formData = new FormData();
    imagesToDelete.map(image => {
        formData.append("imageId", +image[0].imageId);
        formData.append("imageSrc", image[0].imageSrc);
        formData.append("imageMin", image[0].imageMin);
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

const deleteSingleImage = image => {
    // console.log(image);
    
    const formData = new FormData();
    formData.append("imageId", +image[0].imageId);
    formData.append("imageSrc", image[0].imageSrc);
    formData.append("imageMin", image[0].imageMin);
    formData.append("action", "delete_image");

    return axios({
        method: "post",
        url: API_URL + `/index.php`,
        mode: "cors",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
    });
}

const imagesService = {
    uploadImages,
    deleteImages,
    deleteSingleImage
};

export default imagesService;

