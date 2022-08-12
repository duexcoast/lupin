import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',

  auth: null,
};

export const fetchUser = createAsyncThunk('users/fetchUserStatus', async () => {
  const { data } = await axios.get('/api/current_user');
  return data;
});

export const handleStripeWebhook = createAsyncThunk('users/handleStripeWebhook', async () => {
  const res = await axios.post('')
})

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    def: (state, action) => {
      return state.auth;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.auth = action.payload || false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        (state.status = 'failed'), (state.error = action.error.message);
      });
  },
});

export const { def } = userSlice.actions;

export default userSlice.reducer;
