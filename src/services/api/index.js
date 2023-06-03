import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VUE_APP_BACK_URL,
    timeout: 5000,
});

// Interceptador de solicitações
instance.interceptors.request.use(config => {  
    
    config.headers.Authorization = process.env.VUE_APP_TOKEN; 
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;
