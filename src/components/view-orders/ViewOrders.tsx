import React, { useEffect } from 'react';
import classes from './ViewOrders.module.css';
import Card from '../UI/Card';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux-hooks';
import { fetchUserOrders } from '../../store/orders-slice';
import ViewOrder from './ViewOrder';

const ViewOrders = () => {
  const dispatch = useAppDispatch();
  const ordersState = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch, ordersState.itemsWereChanged]);
  return (
    <section className={classes.viewOrders}>
      <h2>Orders</h2>
      <Card>
        <ul>
          {ordersState.items.map((item) => (
            <ViewOrder key={item.id} order={item} />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default ViewOrders;
