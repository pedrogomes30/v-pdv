import TokenService from '../token';
import axios from './index';

export function getCupom(cupomCode) {
    const token = TokenService.getToken(); 
  
    const headers = {
      Authorization: `Bearer ${token}`, 
    };
  
    return axios.get(`/cupom?code=${cupomCode}`, { headers })
      .then(response => {
        return response.data.data;
      })

      .catch(error => {
        console.log(error);
        throw new Error(error.response.data.data);
      });
}

export function putCupom(cupom) {
  const token = TokenService.getToken(); 

  const headers = {
    Authorization: `Bearer ${token}`, 
  };

  return axios.put(`/cupom`, cupom, { headers })
  .then(response => {
      return response.data.data;
  })

  .catch(error => {
      console.log(error);
      throw new Error(error.response.data.data);
  });
}
