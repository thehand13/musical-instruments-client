import React from 'react';
import { useAppSelector } from '../../hooks/react-redux-hooks';
import ShopListItem from './ShopListItem';

const ShopItemsList: React.FC = () => {
  const shopState = useAppSelector((state) => state.shop);
  return (
    <ul>
      {!shopState.items && <p>Sorry! Shop doesn`t have any items</p>}
      {shopState.items &&
        shopState.items.map((item) => (
          <ShopListItem key={item.id} item={item} />
        ))}
    </ul>
  );
};

export default ShopItemsList;
