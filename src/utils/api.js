import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bills-planner-nestjs.herokuapp.com/bp/v1',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;