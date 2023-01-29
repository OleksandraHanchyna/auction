import $axios from '../services/axios';

export const authorization = async payload => {
  return await $axios.post('/login', payload);
};
export const registration = async payload => {
  return await $axios.post('/registration', payload);
};
export const getUser = async() => {
  return await $axios.get('/user/me');
};