import React from 'react';
import { useAppDispatch } from '../../hooks/react-redux-hooks';
import {
  addCartItem,
  CartItem,
  removeCartItem,
} from '../../store/cart-items-slice';
import Card from '../UI/Card';
import classes from './CartListItem.module.css';

const CartListItem: React.FC<{ item: CartItem }> = (props) => {
  const dispatch = useAppDispatch();

  const addCartItemHandler = () => {
    dispatch(
      addCartItem({
        title: props.item.title,
        id: props.item.id,
        price: props.item.price,
      })
    );
  };
  const removeCartItemHandler = () => {
    dispatch(removeCartItem(props.item.id));
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{props.item.title}</h3>
          <div className={classes.price}>
            ${(props.item.price * props.item.quantity).toFixed(2)}{' '}
            <span className={classes.itemprice}>
              (${props.item.price.toFixed(2)}/item)
            </span>
          </div>
        </header>
        <div className={classes.details}>
          <div className={classes.quantity}>
            x <span>{props.item.quantity}</span>
          </div>
          <div className={classes.actions}>
            <button onClick={removeCartItemHandler}>-</button>
            <button onClick={addCartItemHandler}>+</button>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default CartListItem;
