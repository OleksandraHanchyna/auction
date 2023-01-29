// import { createSlice } from '@reduxjs/toolkit';
// import { getAuctions, addAuction } from '../api/auction';
//
// const initialState = {
//   auctions: [],
// };
//
// export const AuctionReducer = createSlice({
//   name: 'auctionReducer',
//   initialState,
//   reducers: {
//     loadingAuctions: ( state, { payload }) => {
//       state.auctions = payload;
//     },
//     loadingAuction: (state, { payload }) => {
//       state.currentAuction = payload;
//     },
//     addAuction: ( state, { payload }) => {
//       state.auctions.push(payload);
//     },
//   },
// });

// export const createAuction = value =>
//   async dispatch => {
//     try {
//       const response = await addAuction(value);
//       console.log(response.data);
//       //dispatch(addAuction(response.data.auctions));
//     } catch (err) {
//       console.log('AxiosError:',err);
//       return err;
//     }
//   };

// export const loadAuctions = () =>
//   async dispatch => {
//     try {
//       const response = await getAuctions();
//       dispatch(loadingAuctions(response.data));
//     } catch (err) {
//       console.log('AxiosError:',err);
//       return err;
//     }
//   };

// export const loadAuction = id =>
//   async dispatch => {
//     try {
//       const response = await getAuction(id);
//       dispatch(loadingAuction(response.data));
//     } catch (err) {
//       console.log('AxiosError:',err);
//       return err;
//     }
//   };

// export const { loadingAuctions } = AuctionReducer.actions;
// export default AuctionReducer.reducer;
