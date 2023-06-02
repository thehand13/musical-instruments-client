import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../UI/Card';
import classes from './NotFoundItem.module.css';

const NotFound: React.FC = () => {
  return (
    <Card>
      <h2>Sorry! Page was not found</h2>
      <Link to="/">
        <button className={classes.return}>Return to the shop</button>
      </Link>
    </Card>
  );
};

export default NotFound;
