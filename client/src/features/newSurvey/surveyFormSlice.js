import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../users/userSlice';
import axios from 'axios';

const initialState = {
  formValues: null,
  loading: true,
  error: null,
};

export const submitSurvey = createAsyncThunk(
  '/api/surveys',
  async (formValues, { dispatch }) => {
    try {
      const { data } = await axios.post('/api/surveys', formValues);
      dispatch(fetchUser(data));
    } catch (err) {
      console.log(err);
    }
  }
);
export const surveyFormSlice = createSlice({
  name: 'surveyForm',
  initialState,
  reducers: {
    surveyFormValue: (state, action) => {
      state.formValues = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitSurvey.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(submitSurvey.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export const { surveyFormValue } = surveyFormSlice.actions;
export default surveyFormSlice.reducer;
