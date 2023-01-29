import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const LoaderReducer = createSlice({
  name:'loaderReducer',
  initialState,
  reducers: {
    loading: state => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { loading } = LoaderReducer.actions;
export default LoaderReducer.reducer;