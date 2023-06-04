import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  productId: number;
  productQuantity: number;
  productPrice: number;
}

interface CartItemsState {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  loading: boolean;
  error: string | null;
  itemsWereChanged: boolean;
  firstLoad: boolean;
}

const initialState: CartItemsState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  loading: false,
  error: null,
  itemsWereChanged: false,
  firstLoad: true,
};

export const cartItemsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(
      state,
      action: PayloadAction<Omit<CartItem, 'productQuantity'>>
    ) {
      const id = action.payload.productId;
      const price = action.payload.productPrice;
      const existingItem = state.items.find((item) => item.productId === id);
      if (!existingItem) {
        state.items.push({
          productId: id,
          productQuantity: 1,
          productPrice: price,
        });
      } else {
        existingItem.productQuantity++;
      }
      state.totalPrice += price;
      state.totalQuantity++;
      state.itemsWereChanged = !state.itemsWereChanged;
    },
    removeCartItem(
      state,
      action: PayloadAction<Omit<CartItem, 'productQuantity'>>
    ) {
      const id = action.payload.productId;
      const price = action.payload.productPrice;
      const existingItem = state.items.find((item) => item.productId === id);

      if (existingItem) {
        if (existingItem.productQuantity === 1) {
          state.items = state.items.filter((item) => item.productId !== id);
        } else {
          existingItem.productQuantity--;
        }
        state.totalPrice -= price;
        state.totalQuantity--;
        state.itemsWereChanged = !state.itemsWereChanged;
      }
    },
    clearCartItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addCartItem, removeCartItem, clearCartItems } =
  cartItemsSlice.actions;
export const cartItemsReducer = cartItemsSlice.reducer;
