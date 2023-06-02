import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

export interface ShopItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface ShopItemsState {
  items: ShopItem[];
  loading: boolean;
  error: string | null;
  itemsWereChanged: boolean;
}

const initialState: ShopItemsState = {
  items: [],
  loading: false,
  error: null,
  itemsWereChanged: false,
};

export const fetchShopItems = createAsyncThunk<
  ShopItem[],
  undefined,
  { rejectValue: string }
>('shop/fetchShopItems', async function (_, { rejectWithValue }) {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/products`
  );
  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }

  const responseData = await response.json();
  return responseData;
});

export const addShopItem = createAsyncThunk<
  { name: string },
  {
    title: string;
    price: number;
    description: string;
    authToken: string;
  },
  { rejectValue: string }
>('shop/addShopItem', async function (item, { rejectWithValue }) {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/products`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    }
  );
  if (!response.ok) {
    return rejectWithValue('Can`t add new item to the shop');
  }

  const responseData = await response.json();
  return responseData;
});

export const removeShopItem = createAsyncThunk<
  string,
  { id: number; authToken: string },
  { rejectValue: string }
>(
  'shop/removeShopItem',
  async function ({ id, authToken }, { rejectWithValue }) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      return rejectWithValue('Can`t remove item from the shop');
    }

    const responseData = await response.json();
    return responseData;
  }
);

export const shopItemsSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopItems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const itemsArray: ShopItem[] = [];
        if (action.payload) {
          for (let [, value] of Object.entries(action.payload)) {
            itemsArray.push({
              ...value,
            });
          }
          state.items = itemsArray;
          state.itemsWereChanged = false;
        }
      })
      .addCase(addShopItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addShopItem.fulfilled, (state, action) => {
        state.itemsWereChanged = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(removeShopItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeShopItem.fulfilled, (state, action) => {
        state.itemsWereChanged = true;
        state.loading = false;
        state.error = null;
        console.log(action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const shopItemsReducer = shopItemsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
