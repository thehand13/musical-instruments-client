import React, { useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks/react-redux-hooks';
import { addShopItem } from '../../store/shop-items-slice';
import classes from './AdministrationAddNewItem.module.css';

const AdministrationAddNewItem: React.FC = () => {
  const dispatch = useAppDispatch();

  const [titleState, setTitleState] = useState('');
  const [priceState, setPriceState] = useState('');
  const [descriptionState, setDescriptionState] = useState('');
  const [imageState, setImageState] = useState<File>();
  const form = useRef<any>();

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleState(event.target.value);
  };
  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceState(event.target.value);
  };
  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionState(event.target.value);
  };
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files) {
      setImageState(event.target.files[0]);
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (imageState) {
      const formData = new FormData(form.current);
      formData.append('title', titleState);
      formData.append('description', descriptionState);
      formData.append('price', priceState);
      formData.append('image', imageState);
      dispatch(addShopItem(formData));
      setTitleState('');
      setPriceState('');
      setDescriptionState('');
      setImageState(undefined);
    }
  };
  return (
    <form
      action=""
      ref={form}
      className={classes['add-item']}
      onSubmit={submitHandler}
    >
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
      <label htmlFor="Image">Image</label>
      <input onChange={onImageChange} type="file" accept=".jpg" />
      <button>Add New Item</button>
    </form>
  );
};

export default AdministrationAddNewItem;
