import React from 'react';
import Card from '../UI/Card';
import classes from './About.module.css';

const About: React.FC = () => {
  return (
    <Card>
      <h2 className={classes.about}>About us</h2>
      <p>Music Center was founded in 2023 by Roman Petrov.</p>
    </Card>
  );
};

export default About;
