import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux-hooks';
import { hideLoginModal } from '../../store/ui-slice';
import Card from '../UI/Card';
import Modal from '../UI/Modal';

import classes from './LoginModal.module.css';
import {
  clearAuthMessage,
  fetchUserInfo,
  signIn,
  signUp,
} from '../../store/auth-slice';

const LoginModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [nameState, setNameState] = useState('');
  const [surnameState, setSurnameState] = useState('');
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameState(event.target.value);
  };
  const onSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurnameState(event.target.value);
  };
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(event.target.value);
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState(event.target.value);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) {
      dispatch(signIn({ email: emailState, password: passwordState }));
    } else {
      dispatch(
        signUp({
          email: emailState,
          password: passwordState,
          name: nameState,
          surname: surnameState,
        })
      );
      setNameState(() => '');
      setSurnameState(() => '');
      setEmailState(() => '');
      setPasswordState(() => '');
    }
  };
  useEffect(() => {
    if (authState.loggedIn) {
      dispatch(fetchUserInfo());
      dispatchHideLoginModal();
    }
  }, [authState.loggedIn]);
  const dispatchHideLoginModal = dispatch.bind(null, hideLoginModal());

  useEffect(() => {
    dispatch(clearAuthMessage());
  }, [isLogin]);

  return (
    <Modal closeModalFunc={dispatchHideLoginModal}>
      <Card>
        <h2>{isLogin ? 'Log In' : 'Create new account'}</h2>
        {authState.message && (
          <p className={classes['auth-message']}>{authState.message}</p>
        )}
        <form className={classes['login-form']} onSubmit={submitHandler}>
          {!isLogin && (
            <>
              <label htmlFor="Name">Name</label>
              <input
                onChange={onNameChange}
                required
                type="text"
                value={nameState}
              />
              <label htmlFor="Surname">Surname</label>
              <input
                onChange={onSurnameChange}
                required
                type="text"
                value={surnameState}
              />
            </>
          )}
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
