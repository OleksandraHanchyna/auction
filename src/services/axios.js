import axios from 'axios';
import Cookies from 'js-cookie';
import { logout } from '../store/AuthReducer';

const $axios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
// TODO: use import for store
let store;
export const injectStore = _store => {
  store = _store;
};

$axios.interceptors.request.use(config => {
  //console.log('store', store)
  const token = Cookies.get('token');
  console.log('token', token);

  if(token) {
    return { ...config, headers: { Authorization : `Bearer ${token}` } };
  }

  return config;
}, error => Promise.reject(error));

$axios.interceptors.response.use(
  response => {
  return response;
},
    error => {
  const errResponse = error.response;

  if(errResponse.status === 401) {
    store.dispatch(logout());
    return;
  }

  return Promise.reject(error);
});

export default $axios;
