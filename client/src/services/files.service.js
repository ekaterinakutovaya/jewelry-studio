import axios from "axios";
import { API_URL } from "../utils/consts";

const fetchFiles = () => {
    return axios.get(API_URL + `/fetch_files.php`)
}

const uploadFile = (file, orderId) => {
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("orderId", +orderId);
    formData.append("action", "file_upload");

    return axios({
        method: "post",
        url: API_URL + `/index.php`,
        mode: "cors",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
    })
}

const deleteFile = file => {
    const formData = new FormData();
    formData.append("fileId", +file.fileId);
    formData.append("fileUniqueName", file.fileUniqueName);
    formData.append("action", "delete_file");

    return axios({
        method: "post",
        url: API_URL + `/index.php`,
        mode: "cors",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
    });
}


const filesService = {
    fetchFiles,
    uploadFile,
    deleteFile
};

export default filesService;