import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux-hooks';
import { addShopItem } from '../../store/shop-items-slice';
import classes from './AdministrationAddNewItem.module.css';

const AdministrationAddNewItem: React.FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const [titleState, setTitleState] = useState('');
  const [priceState, setPriceState] = useState('');
  const [descriptionState, setDescriptionState] = useState('');

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleState(event.target.value);
  };
  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceState(event.target.value);
  };
  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionState(event.target.value);
  };

  const addItemHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      titleState.trim().length !== 0 &&
      priceState.trim().length !== 0 &&
      descriptionState.trim().length !== 0
    ) {
      dispatch(
        addShopItem({
          title: titleState,
          price: +priceState,
          description: descriptionState,
          authToken: authState.idToken,
        })
      );
      setTitleState('');
      setPriceState('');
      setDescriptionState('');
    }
  };
  return (
    <form className={classes['add-item']} onSubmit={addItemHandler}>
      <label htmlFor="Title">Title</label>
      <input onChange={onTitleChange} type="text" value={titleState} />
      <label htmlFor="Price">Price</label>
      <input onChange={onPriceChange} type="number" value={priceState} />
      <label htmlFor="Description">Description</label>
      <input
        onChange={onDescriptionChange}
        type="text"
        value={descriptionState}
      />
      <button>Add New Item</button>
    </form>
  );
};

export default AdministrationAddNewItem;
