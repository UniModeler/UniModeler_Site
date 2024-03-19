import axios from 'axios';
import get from 'local-storage';

function api() {
  let token = get('user-login')?.token;

  return axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      'x-access-token': token
    }
  })
}

export default api;