import axios from 'axios';
import TokenService from '../token'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BACK_URL,
  timeout: 60000,
});

instance.interceptors.request.use(config => {  
  const token = TokenService.getToken(); 
  config.headers['Authorization'] = token ? `Bearer ${token}` : process.env.VUE_APP_TOKEN;
  config.headers['Content-Type'] = 'application/json';
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
