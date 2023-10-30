import TokenService from '../token'
import axios from './index';

export async function getCupom(cupomCode) {
    const token = TokenService.getToken(); 
  
    const headers = {
      Authorization: `Bearer ${token}`, 
    };
  
    const data = {
      code: cupomCode 
    };
  
    return axios.get(`/cupom`, data, { headers })
      .then(response => {
        if (response.data.error) {
          throw new Error(response.data.data);
        }
        TokenService.setToken(response.data.data.access);
        console.log("RESPONSE CUPOM",response)
        return response;
      })
      .catch(error => {
        throw new Error(error);
      });
  }