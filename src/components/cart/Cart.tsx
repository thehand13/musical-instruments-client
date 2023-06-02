import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux-hooks';
import { fetchCartItems, pushCartItems } from '../../store/cart-items-slice';
import CartList from './CartList';
import classes from './Cart.module.css';
import Card from '../UI/Card';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
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
      <section className={classes.cart}>
        <h2>Cart</h2>
        <CartList />
      </section>

      {cartState.items.length ? (
        <Card>
          <div className={classes.checkout}>
            <h3>Total Price:</h3>
            <div className={classes.price}>
              $
              {cartState.items
                .reduce((totalPrice, item) => {
                  return totalPrice + item.totalPrice;
                }, 0)
                .toFixed(2)}
            </div>
          </div>
        </Card>
      ) : (
        false
      )}
    </>
  );
};

export default Cart;
