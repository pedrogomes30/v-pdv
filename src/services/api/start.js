import TokenService from '../token'
import axios from './index';

export function start() {
  const token = TokenService.getToken();

  const headers = {
    Authorization: `Bearer ${token}`, 
  };

  return axios.get(`/start`, { headers })
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
export function setCashier(cashierId) {
  const token = TokenService.getToken(); 

  const headers = {
    Authorization: `Bearer ${token}`, 
  };

  const data = {
    cashier: cashierId
  };

  return axios.post(`/start`, data, { headers })
    .then(response => {
      if (response.data.error) {
        throw new Error(response.data.data);
      }
      TokenService.setToken(response.data.data.access);

      return response.data.data.data;
    })
    .catch(error => {
      throw new Error(error);
    });
}

export default {
  start,
  setCashier
};
