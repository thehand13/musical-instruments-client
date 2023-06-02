import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Shop from './components/shop/Shop';
import Cart from './components/cart/Cart';
import Administration from './components/administration/Administration';
import About from './components/about/About';
import NotFound from './components/not-found/NotFound';
import MainLayout from './layouts/MainLayout';
import { useAppSelector, useAppDispatch } from './hooks/react-redux-hooks';
import { fetchCartItems, pushCartItems } from './store/cart-items-slice';
import LoginModal from './components/auth/LoginModal';

function App() {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector((state) => state.ui);
  const authState = useAppSelector((state) => state.auth);
  const cartState = useAppSelector((state) => state.cart);
  useEffect(() => {
    if (cartState.firstLoad) {
      dispatch(fetchCartItems());
    } else {
      dispatch(pushCartItems(cartState.items));
    }
  }, [dispatch, cartState.itemsWereChanged]);
  return (
    <>
      {uiState.loginModalisShown && <LoginModal />}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          {authState.isAdmin && (
            <Route path="/admin" element={<Administration />} />
          )}
        </Route>
      </Routes>
    </>
  );
}

export default App;
