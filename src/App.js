import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './store/AuthReducer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RedirectRoute from './components/hoc/RedirectRoute';
import Authorization from './components/auth/Authorization';
import Registration from './components/auth/Registration';
import Fragment from './components/hoc/fragment/Fragment';
import Profile from './components/profile/Profile';
import AuctionItem from './components/auction/item/AuctionItem';
import ViewAuction from './components/auction/view/ViewAuction';
import ListAuctions from './components/auction/list/ListAuctions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const isAuth = Cookies.get('token');
  const user = useSelector(state => state.auth.user);

  useEffect( () => {
    (async() => await dispatch(loadUser()))();
  }, []);

  useEffect(() => {}, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RedirectRoute redirectPath="/" isAllowed={ !isAuth } />}>
          <Route path='/auth' element={ <Authorization /> } />
          <Route path='/reg' element={ <Registration /> } />
        </Route>
        <Route element={<RedirectRoute redirectPath="/auth" isAllowed={ isAuth } />}>
          <Route path='/' element={ <Fragment><ListAuctions/></Fragment> } />
        </Route>
        <Route path="/profile" element={ <Fragment><Profile/></Fragment> } />
        <Route path="/card/:id" element={ <Fragment><AuctionItem/></Fragment> } />
        <Route path="/view/:id" element={ <Fragment><ViewAuction/></Fragment> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
