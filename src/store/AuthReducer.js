import { createSlice } from '@reduxjs/toolkit';
import { authorization, registration, getUser } from '../api/auth';
import Cookies from 'js-cookie';

const initialState = {
  user: {
    id: null,
    name: null,
    email: '',
  },
};

export const AuthSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      const { id, username, email } = payload;
      state.user = {
        id,
        name: username,
        email,
      };
    },
    logout: state => {
      Cookies.set('token', '', { expires: 0 });
      state.user = {
        id: null,
        name: null,
        email: '',
      };
    },
  },
});

export const login = value =>
  async dispatch => {
  try {
    const response = await authorization(value);
    Cookies.set('token', response.data.token, { expires: 1 });
    dispatch(setUser(response.data.user));
  } catch (err) {
    console.log('AxiosError:',err);
    return err;
  }
};

export const registry = value =>
  async dispatch => {
    try {
      const response = await registration(value);
      Cookies.set('token', response.data.token, { expires: 1 });
      dispatch(setUser(response.data.user));
    } catch (err) {
      console.log('AxiosError:',err);
      return err;
    }
  };

export const loadUser = () =>
  async dispatch => {
    try {
      const response = await getUser();
      dispatch(setUser(response.data));
    } catch (err) {
      console.log('AxiosError:',err);
      return err;
    }
  };

export const { setUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
