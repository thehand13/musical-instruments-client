import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux-hooks';
import { fetchShopItems } from '../../store/shop-items-slice';
import ShopItemsList from './ShopItemsList';
import classes from './Shop.module.css';

const Shop: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.cart);
  useEffect(() => {}, [dispatch, cartState.itemsWereChanged]);
  useEffect(() => {
    dispatch(fetchShopItems());
  }, [dispatch]);
  return (
    <section className={classes.shop}>
      <h2>Shop</h2>
      <ShopItemsList />
    </section>
  );
};

export default Shop;
