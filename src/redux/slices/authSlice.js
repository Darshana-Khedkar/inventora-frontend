import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/axiosInstance';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
};

// Login thunk
export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const res = await API.post('/users/login', data); // ✅ FIXED
    localStorage.setItem('userInfo', JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message || 'Login failed');
  }
});

// Register thunk
export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const res = await API.post('/users/register', data); // ✅ FIXED
    localStorage.setItem('userInfo', JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message || 'Registration failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
