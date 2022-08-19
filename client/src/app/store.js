import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import surveyFormReducer from '../features/newSurvey/surveyFormSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    surveyFormData: surveyFormReducer,
  },
});
