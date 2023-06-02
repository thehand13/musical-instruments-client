import { createSlice } from '@reduxjs/toolkit';

interface CartItemsState {
  loginModalisShown: boolean;
}

const initialState: CartItemsState = {
  loginModalisShown: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showLoginModal(state) {
      state.loginModalisShown = true;
    },
    hideLoginModal(state) {
      state.loginModalisShown = false;
    },
  },
});

export const { showLoginModal, hideLoginModal } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
