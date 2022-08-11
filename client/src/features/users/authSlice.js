import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  auth: {},
};

const fetchUser = createAsyncThunk({})

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
