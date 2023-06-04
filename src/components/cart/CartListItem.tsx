import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux-hooks';
import {
  addCartItem,
  CartItem,
  removeCartItem,
} from '../../store/cart-items-slice';
import Card from '../UI/Card';
import classes from './CartListItem.module.css';
import { ShopItem } from '../../store/shop-items-slice';

const initShopItem: ShopItem = {
  id: 0,
  title: '',
  description: '',
  price: 0,
  image: '',
  createdAt: '',
  updatedAt: '',
};

const CartListItem: React.FC<{ item: CartItem }> = (props) => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.cart);
  const [shopItemState, setShopItemState] = useState<ShopItem>(initShopItem);

  const addCartItemHandler = () => {
    dispatch(
      addCartItem({
        productId: props.item.productId,
        productPrice: props.item.productPrice,
      })
    );
  };
  const removeCartItemHandler = () => {
    dispatch(
      removeCartItem({
        productId: props.item.productId,
        productPrice: props.item.productPrice,
      })
    );
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/products/${props.item.productId}`,
      {
        method: 'GET',
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setShopItemState(responseData);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [dispatch, props.item.productId]);
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{shopItemState?.title}</h3>
          <div className={classes.price}>
            ${(shopItemState.price * props.item.productQuantity).toFixed(2)}{' '}
            <span className={classes.itemprice}>
              (${shopItemState.price.toFixed(2)}/item)
            </span>
          </div>
        </header>
        <div className={classes.details}>
          <div className={classes.quantity}>
            x <span>{props.item.productQuantity}</span>
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
