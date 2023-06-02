import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/react-redux-hooks';
import { loginUser } from '../../store/auth-slice';
import { hideLoginModal } from '../../store/ui-slice';
import Card from '../UI/Card';
import Modal from '../UI/Modal';

import classes from './LoginModal.module.css';

const LoginModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(event.target.value);
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState(event.target.value);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let authUrl;

    if (isLogin) {
      authUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4ufg4-Af6TL_4mnvfLQ0e8v8b8YYFNG8';
    } else {
      authUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4ufg4-Af6TL_4mnvfLQ0e8v8b8YYFNG8';
    }
    fetch(authUrl, {
      method: 'POST',
      body: JSON.stringify({
        email: emailState,
        password: passwordState,
        returnSecureToken: true,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((responseValue) => {
        if (responseValue.ok) {
          return responseValue.json();
        } else {
          return responseValue.json().then((responseData) => {
            let errorMessage = 'Registration Failed';
            if (
              responseData &&
              responseData.error &&
              responseData.error.message
            ) {
              errorMessage = responseData.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((responseData) => {
        dispatch(
          loginUser({
            fetchedAuthToken: responseData.idToken,
            fetchedLocalId: responseData.localId,
            fetchedEmail: emailState,
          })
        );
        setEmailState('');
        setPasswordState('');
        setIsLogin(true);
        dispatch(hideLoginModal());
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const dispatchHideLoginModal = dispatch.bind(null, hideLoginModal());

  return (
    <Modal closeModalFunc={dispatchHideLoginModal}>
      <Card>
        <h2>{isLogin ? 'Log In' : 'Create new account'}</h2>
        <form className={classes['login-form']} onSubmit={submitHandler}>
          <label htmlFor="E-mail">E-mail</label>
          <input
            onChange={onEmailChange}
            required
            type="e-mail"
            value={emailState}
          />
          <label htmlFor="Password">Password</label>
          <input
            onChange={onPasswordChange}
            required
            type="password"
            value={passwordState}
          />
          <button>{isLogin ? 'Log In' : 'Sign Up'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin
              ? 'Don`t have an account yet? Sign up now'
              : 'Login with existing account'}
          </button>
        </form>
      </Card>
    </Modal>
  );
};

export default LoginModal;
