import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/react-redux-hooks';
import { fetchShopItems } from '../../store/shop-items-slice';
import AdministrationAddNewItem from './AdministrationAddNewItem';
import AdministrationListItem from './AdministrationListItem';
import Card from '../UI/Card';
import classes from './Administration.module.css';

const Administration: React.FC = () => {
  const dispatch = useAppDispatch();
  const shopState = useAppSelector((state) => state.shop);

  useEffect(() => {
    dispatch(fetchShopItems());
  }, [dispatch, shopState.itemsWereChanged]);

  return (
    <section className={classes.admin}>
      <Card>
        <AdministrationAddNewItem />
      </Card>

      <ul>
        {shopState.items &&
          shopState.items.map((item) => (
            <AdministrationListItem key={item.id} item={item} />
          ))}
      </ul>
    </section>
  );
};

export default Administration;
