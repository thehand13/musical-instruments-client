import React from 'react';
import classes from './MyProfile.module.css';
import UserInfo from './UserInfo';

const MyProfile = () => {
  return (
    <section className={classes.profile}>
      <UserInfo />
    </section>
  );
};

export default MyProfile;
