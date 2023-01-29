import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthReducer';
import loaderReducer from './LoaderReducer';
//import auctionReducer from './AuctionReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    load: loaderReducer,
    //data: auctionReducer,
  },
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
