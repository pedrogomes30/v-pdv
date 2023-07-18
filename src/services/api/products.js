import TokenService from '../token'
import axios from './index';

export function getProduct() {
    const token = TokenService.getToken();
  
    const headers = {
      Authorization: `Bearer ${token}`, 
    };
  
    return axios.get(`/product`, { headers })
      .then(response => {
        if (response.data.error) {
          throw new Error(response.data.data);
        }
        return response.data.data.data;
      })
      .catch(error => {
        throw new Error(error);
    });
}