import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  formValues: null,
};

export const submitSurvey = createAsyncThunk('/api/surveys');
export const surveyFormSlice = createSlice({
  name: 'surveyForm',
  initialState,
  reducers: {
    surveyForm: (state, action) => {
      state.formValues = action.payload;
    },
  },
});

export const { surveyForm } = surveyFormSlice.actions;
export default surveyFormSlice.reducer;
