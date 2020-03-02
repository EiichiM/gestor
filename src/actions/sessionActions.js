import axios from 'axios';
// import { useHistory } from 'react-router';

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

export const login = username => dispatch => {
  // console.log(username);
  const userHeaders = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'text/plain'
  });
  return axios({
    method: 'get',
    url: `http://ibanusers-dev.us-east-2.elasticbeanstalk.com/user/${username}`,
    headers: userHeaders
  })
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: SESSION_LOGIN,
          payload: res.data
        });
      }
    })
    .catch(
      (err) => console.log(`error :(  ${err}`)
    );
};

export const logout = () => dispatch =>{
  return (
    dispatch({
      type: SESSION_LOGOUT
    })
  )
}

