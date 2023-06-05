import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import cookie from 'cookiejs';

interface ISignIn {
  email: string;
  password: string;
}

interface ISignUp extends ISignIn {
  name: string;
  surname: string;
}

interface IRoleInfo {
  value: string;
  description: string;
}

interface IUserInfo {
  email: string;
  name: string;
  surname: string;
  roles: IRoleInfo[];
}

interface IAuthState {
  email: string | null;
  name: string | null;
  surname: string | null;
  loggedIn: boolean;
  isAdmin: boolean;
  loading: boolean;
  message: string | null;
  error: string | null;
}

const initialState: IAuthState = {
  email: null,
  name: null,
  surname: null,
  loggedIn: false,
  isAdmin: false,
  loading: false,
  message: null,
  error: null,
};

export const signIn = createAsyncThunk<any, ISignIn, { rejectValue: string }>(
  'auth/signIn',
  async function (body, { rejectWithValue }) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/authentication/sign-in`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      return rejectWithValue('cant sign in');
    }
    const responseData = { ...response };
    return responseData;
  }
);

export const signUp = createAsyncThunk<any, ISignUp, { rejectValue: string }>(
  'auth/signUp',
  async function (body, { rejectWithValue }) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/authentication/sign-up`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      return rejectWithValue('cant sign up');
    }
    const responseData = await response.json();
    return responseData;
  }
);

export const fetchUserInfo = createAsyncThunk<
  IUserInfo,
  undefined,
  { rejectValue: string }
>('auth/fetchUserInfo', async function (_, { rejectWithValue }) {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/users/by-token`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    return rejectWithValue('cant fetch');
  }
  const responseData = await response.json();
  return responseData;
});

export const refreshToken = createAsyncThunk<any, any, { rejectValue: string }>(
  'auth/refreshToken',
  async function (_, { rejectWithValue }) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/authentication/refresh`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      return rejectWithValue('cant refresh');
    }
    const responseData = await response.json();
    return responseData;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      cookie.remove('accessToken');
      cookie.remove('refreshToken');
      cookie.clear();
      state.email = null;
      state.name = null;
      state.surname = null;
      state.loggedIn = false;
      state.isAdmin = false;
    },
    clearAuthMessage(state) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.loggedIn = true;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.loggedIn = true;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.surname = action.payload.surname;
        for (const role of action.payload.roles) {
          if (role.value === 'admin') {
            state.isAdmin = true;
            break;
          }
        }
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, clearAuthMessage } = authSlice.actions;
export const authReducer = authSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
