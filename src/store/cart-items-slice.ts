import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

export interface CartItem {
  title: string;
  id: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface CartItemsState {
  items: CartItem[];
  totalQuantity: number;
  loading: boolean;
  error: string | null;
  itemsWereChanged: boolean;
  firstLoad: boolean;
}

const initialState: CartItemsState = {
  items: [],
  totalQuantity: 0,
  loading: false,
  error: null,
  itemsWereChanged: false,
  firstLoad: true,
};

export const fetchCartItems = createAsyncThunk<
  CartItem[],
  undefined,
  { rejectValue: string }
>('shop/fetchCartItems', async function (_, { rejectWithValue }) {
  const response = await fetch(
    'https://react-ts-demo-shop-default-rtdb.europe-west1.firebasedatabase.app/cart-items.json'
  );
  if (!response.ok) {
    return rejectWithValue('Cart items can`t be fetched!');
  }

  const responseData = await response.json();
  return responseData;
});

export const pushCartItems = createAsyncThunk<
  CartItem[],
  CartItem[],
  { rejectValue: string }
>('shop/pushCartItems', async function (cartItemsArray, { rejectWithValue }) {
  const response = await fetch(
    'https://react-ts-demo-shop-default-rtdb.europe-west1.firebasedatabase.app/cart-items.json',
    { method: 'PUT', body: JSON.stringify(cartItemsArray) }
  );
  if (!response.ok) {
    return rejectWithValue('Cart items can`t be pushed!');
  }

  const responseData = await response.json();
  return responseData;
});

export const cartItemsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(
      state,
      action: PayloadAction<{
        title: string;
        id: string;
        price: number;
      }>
    ) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          title: newItem.title,
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      state.totalQuantity++;
      state.itemsWereChanged = !state.itemsWereChanged;
    },
    removeCartItem(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice =
            existingItem.totalPrice - existingItem.price;
        }
        state.totalQuantity--;
        state.itemsWereChanged = !state.itemsWereChanged;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const itemsArray: CartItem[] = [];
        let newTotalQuantity: number = 0;
        if (action.payload) {
          for (let [key, value] of Object.entries(action.payload)) {
            newTotalQuantity += value.quantity;
            itemsArray.push({
              title: value.title,
              id: value.id,
              price: value.price,
              quantity: value.quantity,
              totalPrice: value.totalPrice,
            });
          }
          state.items = itemsArray;
          state.totalQuantity = newTotalQuantity;
        } else {
          state.items = [];
          state.totalQuantity = newTotalQuantity;
        }
        state.firstLoad = false;
      })
      .addCase(pushCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(pushCartItems.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addCartItem, removeCartItem } = cartItemsSlice.actions;
export const cartItemsReducer = cartItemsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
