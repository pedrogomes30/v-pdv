import TokenService from '../token'
import axios from './index';

export function start() {
  const token = TokenService.getToken(); // Obtém o token do cookie

  const headers = {
    Authorization: `Bearer ${token}`, // Define o cabeçalho de autorização com o token
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

export default {
  start,
};
