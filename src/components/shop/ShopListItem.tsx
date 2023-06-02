import React from 'react';
import { useAppDispatch } from '../../hooks/react-redux-hooks';
import { addCartItem } from '../../store/cart-items-slice';
import { ShopItem } from '../../store/shop-items-slice';
import Card from '../UI/Card';
import classes from './ShopListItem.module.css';

const ShopListItem: React.FC<{ item: ShopItem }> = (props) => {
  const dispatch = useAppDispatch();

  const addToCartHandler = () => {
    dispatch(
      addCartItem({
        title: props.item.title,
        id: props.item.id,
        price: props.item.price,
      })
    );
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{props.item.title}</h3>
          <div className={classes.price}>${props.item.price.toFixed(2)}</div>
        </header>
        <p>{props.item.description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ShopListItem;
