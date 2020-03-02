import axios from 'axios';
import setAutorizationToken from '../utils/setAutorizationToken';

export default function login(data) {
  return dispatch => {
    return dispatch =>
      axios.post('api/auth', data).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAutorizationToken(token);
      });
  };
}
