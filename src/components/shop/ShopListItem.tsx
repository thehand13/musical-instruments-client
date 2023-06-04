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
      addCartItem({ productId: props.item.id, productPrice: props.item.price })
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
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${props.item.image}`}
          alt={props.item.title}
          className={classes.image}
          loading="lazy"
        />
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ShopListItem;
