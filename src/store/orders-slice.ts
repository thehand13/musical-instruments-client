import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

export interface OrderProduct {
  id: number;
  productQuantity: number;
  productId: number;
  orderId: number;
}

export interface Order {
  id: number;
  userId: number;
  orderProducts: OrderProduct[];
  deliveryDate: string;
  deliveryAddress: string;
  createdAt: string;
  updatedAt: string;
}

interface OrdersState {
  items: Order[];
  loading: boolean;
  error: string | null;
  itemsWereChanged: boolean;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
  itemsWereChanged: false,
};

export const fetchOrders = createAsyncThunk<
  any,
  undefined,
  { rejectValue: string }
>('orders/fetchOrders', async function (_, { rejectWithValue }) {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }

  const responseData = await response.json();
  return responseData;
});

export const removeOrder = createAsyncThunk<
  string,
  number,
  { rejectValue: string }
>('orders/removeOrder', async function (id, { rejectWithValue }) {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/orders/${id}`,
    {
      credentials: 'include',
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    return rejectWithValue('Can`t remove item from the shop');
  }

  const responseData = await response.json();
  return responseData;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = structuredClone(action.payload);
        state.itemsWereChanged = !state.itemsWereChanged;
      })
      .addCase(removeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.itemsWereChanged = !state.itemsWereChanged;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const ordersReducer = ordersSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
