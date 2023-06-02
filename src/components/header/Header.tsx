import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/react-redux-hooks';
import AuthButton from '../auth/AuthButton';

import classes from './Header.module.css';

const Header: React.FC = () => {
  const authState = useAppSelector((state) => state.auth);
  const cartState = useAppSelector((state) => state.cart);

  return (
    <header className={classes.header}>
      <h1>React Test Shop</h1>
      <nav>
        <Link to="/">
          <button>Shop</button>
        </Link>

        <Link to="/cart">
          <button>
            <span>My Cart</span>
            <span className={classes.badge}>{cartState.totalQuantity}</span>
          </button>
        </Link>

        <Link to="/about">
          <button>About</button>
        </Link>
        {authState.isAdmin && (
          <Link to="/admin">
            <button>Administration</button>
          </Link>
        )}
      </nav>
      <nav>
        <AuthButton />
      </nav>
    </header>
  );
};

export default Header;
