import React from 'react';
import Card from '../UI/Card';
import { useAppSelector } from '../../hooks/react-redux-hooks';

const UserInfo = () => {
  const authState = useAppSelector((state) => state.auth);
  return (
    <Card>
      <div>My name: {authState.name}</div>
      <div>My surname: {authState.surname}</div>
      <div>My email: {authState.email}</div>
    </Card>
  );
};

export default UserInfo;
