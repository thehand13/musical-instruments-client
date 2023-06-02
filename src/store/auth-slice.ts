import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  loggedIn: boolean;
  isAdmin: boolean;
  authToken: string;
  idToken: string;
  email: string;
}

const adminEmailsArray: string[] = ['admin@reacttestshop.com'];

const initialState: LoginState = {
  loggedIn: false,
  isAdmin: false,
  authToken: '',
  idToken: '',
  email: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(
      state,
      action: PayloadAction<{
        fetchedAuthToken: string;
        fetchedLocalId: string;
        fetchedEmail: string;
      }>
    ) {
      state.loggedIn = true;
      for (const email of adminEmailsArray) {
        if (email === action.payload.fetchedEmail) {
          state.isAdmin = true;
          break;
        }
      }
      state.authToken = action.payload.fetchedAuthToken;
      state.idToken = action.payload.fetchedLocalId;
      state.email = action.payload.fetchedEmail;
    },
    logoutUser(state) {
      state.loggedIn = false;
      state.isAdmin = false;
      state.authToken = '';
      state.idToken = '';
      state.email = '';
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
