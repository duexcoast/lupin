import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    def: (state, action) => {
      return state.auth;
    },
  },
});

export const { def } = authSlice.actions;

export default authSlice.reducer;
