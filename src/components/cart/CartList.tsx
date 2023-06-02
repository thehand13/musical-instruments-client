import React from 'react';
import { useAppSelector } from '../../hooks/react-redux-hooks';
import CartListItem from './CartListItem';
import Card from '../UI/Card';
import classes from './CartList.module.css';

const CartList: React.FC = () => {
  const cartState = useAppSelector((state) => state.cart);
  return (
    <>
      {!cartState.items.length && (
        <Card>
          <h2 id={classes.empty}>Your cart is empty</h2>
        </Card>
      )}
      <ul className={classes['']}>
        {cartState.items.map((item) => (
          <CartListItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
};

export default CartList;
