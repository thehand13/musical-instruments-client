import React from 'react';
import Card from '../UI/Card';
import classes from './About.module.css';

const About: React.FC = () => {
  return (
    <Card>
      <h2 className={classes.about}>About us</h2>
      <p>
        React Test Shop was founded in 2021 by developer Roman Petrov. He`s a
        market leader of test shops ;)
      </p>
    </Card>
  );
};

export default About;
