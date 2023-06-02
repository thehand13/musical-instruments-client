import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/react-redux-hooks';
import { ShopItem } from '../../store/shop-items-slice';
import { removeShopItem } from '../../store/shop-items-slice';
import Card from '../UI/Card';
import classes from './AdministrationListItem.module.css';

const AdministrationListItem: React.FC<{ item: ShopItem }> = (props) => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const deleteHandler = () => {
    dispatch(
      removeShopItem({ id: props.item.id, authToken: authState.authToken })
    );
  };
  return (
    <li className={classes.item}>
      <Card>
        <p>Title: {props.item.title}</p>
        <p>Price: ${props.item.price.toFixed(2)}</p>
        <p>Description: {props.item.description}</p>
        <p>Id: {props.item.id}</p>
        <button onClick={deleteHandler}>Delete Item</button>
      </Card>
    </li>
  );
};

export default AdministrationListItem;
