import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Shop from './components/shop/Shop';
import Cart from './components/cart/Cart';
import Administration from './components/administration/Administration';
import About from './components/about/About';
import NotFound from './components/not-found/NotFound';
import MainLayout from './layouts/MainLayout';
import { useAppSelector, useAppDispatch } from './hooks/react-redux-hooks';
import LoginModal from './components/auth/LoginModal';
import cookie from 'cookiejs';
import { fetchUserInfo } from './store/auth-slice';
import ViewOrders from './components/view-orders/ViewOrders';
import MyProfile from './components/my-profile/MyProfile';

function App() {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector((state) => state.ui);
  const authState = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (cookie.get('accessToken')) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch]);
  return (
    <>
      {uiState.loginModalisShown && <LoginModal />}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          {authState.loggedIn && (
            <>
              <Route path="/my-profile" element={<MyProfile />} />
            </>
          )}
          {authState.isAdmin && (
            <>
              <Route path="/admin" element={<Administration />} />
              <Route path="/view-orders" element={<ViewOrders />} />
            </>
          )}
        </Route>
      </Routes>
    </>
  );
}

export default App;
