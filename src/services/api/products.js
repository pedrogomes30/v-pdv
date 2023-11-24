import TokenService from '../token'
import axios from './index';

export function getProduct(sku = null) {
    if(null != sku){
      return getProductBySku(sku);
    }
    const token = TokenService.getToken();
  
    const headers = {
      Authorization: `Bearer ${token}`, 
    };
  
    return axios.get(`/product`, { headers })
      .then(response => {
        if (response.data.error) {
          throw new Error(response.data.data);
        }
        return response.data.data;
      })
      .catch(error => {
        throw new Error(error);
    });
}

function getProductBySku(sku){
  const token = TokenService.getToken();

  const headers = {
    Authorization: `Bearer ${token}`, 
  };

  return axios.get(`/product?sku=${sku}`, { headers })
  .then(response => {
    return response.data.data;
  })
  .catch(error => {
      console.log(error);
      throw new Error(error.response.data.data);
  });
}