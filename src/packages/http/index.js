import axios from 'axios';
import Auth from '../auth/Auth.js';
// import confrg from 'config';
import config from '@/config.js';


let axiosInstance = axios.create({
  baseURL: config.get('apiUrl')
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  // console.log(config);
  // 1 Do something before request is sent
  if(Auth.isAuthenticated()) {
    //always for request, use config of axios (read documentation)
    config.headers.common['Authorization'] = "Bearer " + Auth.getToken();
  }
  // 2 end
  // 3 return config
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use((response) => {

  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default axiosInstance;
