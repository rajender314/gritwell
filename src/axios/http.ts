import axios from 'axios';
import {clearLocalStorage, getLocalStorage} from '../core/localStorageService';

const token = getLocalStorage('token');
const Http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // 'Authorization':  token
  },
  withCredentials: true,
  responseType: 'json',
});
Http.interceptors.request.use(
    (config) => {
      if (token) {
        // config.headers.Authorization = token;
      } else {
        delete Http.defaults.headers.common.Authorization;
      }
      return config;
    },
    (error) => Promise.reject(error),
);

Http.interceptors.response.use(
    (response) => {
      const statusCode = response.data.status_code ? 
response.data.status_code : '';
      if (statusCode === 403 || (statusCode === 401 && (response.data.name &&
(response.data.name ==='invalid_token' ||
     response.data.name ==='unauthorized_request')))){
        clearLocalStorage();
        sessionStorage.clear();

        window.location.reload();
      }
      return response;
    },
    (error) => {
      console.log(error.response);

      if (error.response.status === 401 && error.response.statusText === "Unauthorized" ) {
        clearLocalStorage();
        sessionStorage.clear();
        window.location.reload();
      }
      if (error.response.status === 403) {
        clearLocalStorage();
        sessionStorage.clear();
        window.location.reload();
      }
      // Promise.reject(error)
      return error;
    },
);
export default Http;
