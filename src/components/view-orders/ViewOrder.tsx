import React, { useEffect, useState } from 'react';
import { Order, removeOrder } from '../../store/orders-slice';
import classes from './ViewOrder.module.css';
import { useAppDispatch } from '../../hooks/react-redux-hooks';

const emptyUser = {
  id: 0,
  email: '',
  name: '',
  surname: '',
};

const ViewOrder: React.FC<{ order: Order }> = (props) => {
  const dispatch = useAppDispatch();
  const [userState, setUserState] = useState(emptyUser);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/by-id/${props.order.userId}`,
      {
        credentials: 'include',
      }
    )
      .then((response) => response.json())
      .then((responseData) => setUserState(responseData))
      .catch((error) => alert(error.message));
  }, [props.order.userId]);

  const deleteOrderHandler = () => {
    dispatch(removeOrder(props.order.id));
  };

  return (
    <div className={classes.order}>
      <div className={classes.orderBlock}>
        <div>ID: {props.order.id}</div>
        <div>
          Delivery date: {new Date(+props.order.deliveryDate).getMonth() + 1}.
          {new Date(+props.order.deliveryDate).getDate()}.
          {new Date(+props.order.deliveryDate).getFullYear()}
        </div>
        <div>Address: {props.order.deliveryAddress}</div>
      </div>
      <div className={classes.orderBlock}>
        <div>
          User: {userState.name} {userState.surname}
        </div>
        <div>User email: {userState.email}</div>
      </div>
      <div className={classes.orderBlock}>
        <div>
          Order items:{' '}
          {props.order.orderProducts.map((orderProduct) => (
            <span key={orderProduct.id}>
              PID: {orderProduct.productId} Quantity:
              {orderProduct.productQuantity},
            </span>
          ))}
        </div>
      </div>

      <button onClick={deleteOrderHandler}>Delete order</button>
    </div>
  );
};

export default ViewOrder;
