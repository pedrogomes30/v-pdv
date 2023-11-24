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

export function saveCupom(cupom) {
  const token = TokenService.getToken(); 

  const headers = {
    Authorization: `Bearer ${token}`, 
  };

  return axios.post(`/cupom`, cupom, { headers })
  .then(response => {
      return response.data.data;
  })

  .catch(error => {
      console.log(error);
      throw new Error(error.response.data.data);
  });
}
