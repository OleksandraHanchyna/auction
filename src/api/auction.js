import $axios from '../services/axios';

export const getAuctions = async() => {
    return await $axios.get('/auctions');
};
export const addAuction = async payload => {
    return await $axios.post('/auctions', payload);
};
export const getAuction = async id => {
    return await $axios.get(`/auctions/${id}`);
};


