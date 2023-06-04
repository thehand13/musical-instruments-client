import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux-hooks';
import CartList from './CartList';
import classes from './Cart.module.css';
import Card from '../UI/Card';
import { showLoginModal } from '../../store/ui-slice';
import { clearCartItems } from '../../store/cart-items-slice';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const cartState = useAppSelector((state) => state.cart);

  const [dateState, setDateState] = useState<string>('');
  const [addressState, setAddressState] = useState<string>('');

  const onMakeOrderHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const products = cartState.items.map((item) => {
      return {
        productId: item.productId,
        productQuantity: item.productQuantity,
      };
    });
    const body = {
      deliveryDate: new Date(dateState).getTime(),
      deliveryAddress: addressState,
      products,
    };
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        dispatch(clearCartItems());
        setDateState(() => '');
        setAddressState(() => '');
        alert('Order was successfully created');
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const onLoginHandler = () => {
    dispatch(showLoginModal());
  };

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateState(event.target.value);
  };
  const onAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressState(event.target.value);
  };
  return (
    <>
      <section className={classes.cart}>
        <h2>Cart</h2>
        <CartList />
      </section>

      {cartState.items.length ? (
        <Card>
          <div className={classes.checkout}>
            <h3>Total Price:</h3>
            <div className={classes.price}>
              $ {cartState.totalPrice.toFixed(2)}
            </div>
          </div>

          {authState.loggedIn ? (
            <form
              className={classes['delivery-form']}
              onSubmit={onMakeOrderHandler}
            >
              <label htmlFor="Delivery date">Delivery date</label>
              <input
                type="date"
                value={dateState}
                required
                onChange={onDateChange}
              />
              <label htmlFor="Address">Address</label>
              <input
                type="string"
                value={addressState}
                required
                onChange={onAddressChange}
              />
              <button>Make an order</button>
            </form>
          ) : (
            <button onClick={onLoginHandler}>Log in to make an order</button>
          )}
        </Card>
      ) : (
        false
      )}
    </>
  );
};

export default Cart;
