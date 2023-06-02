import React from 'react';
import classes from './Card.module.css';

const Card: React.FC<{ children: React.ReactNode }> = (props) => {
  return <section className={classes.card}>{props.children}</section>;
};

export default Card;
