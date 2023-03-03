import axios from 'axios';
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { API_URL } from '../utils/consts';


const register = (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('role', 'USER');
    formData.append('action', 'register');

    return axios({
      method: 'post',
      url: API_URL + `/index.php`,
      credentials: 'include',
      mode: 'cors',
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })  
}

const login = (username, password) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('action', 'login');

  return axios({
    method: "post",
    url: API_URL + `/index.php`,
    credentials: "include",
    mode: "cors",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
}

const logout = () => {
  localStorage.removeItem('user');
}


const AuthService = {
  register,
  login,
  logout
};

export default AuthService;