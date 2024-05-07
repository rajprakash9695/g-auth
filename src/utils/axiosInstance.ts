import axios from 'axios';
import { BASE_URL } from '../configs';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const token = localStorage.getItem('token');

if (token) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosInstance;
