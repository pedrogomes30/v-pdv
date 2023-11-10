import TokenService from '../token';
import axios from './index';

export function getCustomer(document) {
    const token = TokenService.getToken(); 
  
    const headers = {
      Authorization: `Bearer ${token}`, 
    };
  
    return axios.get(`/customer?document=${document}`, { headers })
    .then(response => {
        return response.data.data;
    })
    .catch(error => {
        console.log(error);
        throw new Error(error.response.data.data);
    });
}

export function setCustomer(person) {
    const token = TokenService.getToken(); 
  
    const headers = {
      Authorization: `Bearer ${token}`, 
    };

    const data = {
        customer: person
      };
  
    return axios.get(`/customer`, data, { headers })
    .then(response => {
        return response.data.data;
    })
    .catch(error => {
        console.log(error);
        throw new Error(error.response.data.data);
    });
}
