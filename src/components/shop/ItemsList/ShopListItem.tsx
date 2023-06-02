import React from 'react';
import { useAppDispatch } from '../../../hooks/react-redux-hooks';
import { addCartItem } from '../../../store/cart-items-slice';
import { ShopItem } from '../../../store/shop-items-slice';

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
    <li>
      <div>{props.item.title}</div>
      <div>{props.item.description}</div>
      <div>{props.item.price}</div>
      <button onClick={addToCartHandler}>Add to Cart</button>
    </li>
  );
};

export default ShopListItem;
