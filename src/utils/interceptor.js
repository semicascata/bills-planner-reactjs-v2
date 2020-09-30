// import axios from 'axios';
import api from './api';

const interceptor = () => {
  // req
  api.interceptors.request.use(async (req) => {
    const token = localStorage.getItem('token');
    if (token) {
      req.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return req;
  }, err => {
    console.log(err);
    return Promise.reject(err);
  });

  // res
  api.interceptors.response.use(res => {
    return res;
  }, err => {
    const errStatus = err.response.status;

    if (errStatus === 401) {
      console.log(err.response);
      // try {
      //   console.log(errStatus);
      //   const refreshToken = localStorage.getItem('refreshToken');

      //   const res = api.post('/auth/refresh', refreshToken);

      //   // remove invalid token and set new one
      //   localStorage.remoteItem('token');
      //   localStorage.setItem('token', res.data.token);
      //   console.log('Token refreshed');

      // } catch (err) {
      //   console.log(err);
      //   return Promise.reject(err);
      // }
    }

    return err;
  });
};

export default interceptor;