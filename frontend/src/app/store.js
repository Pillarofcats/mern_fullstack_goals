import { configureStore } from '@reduxjs/toolkit';
//Reducers
import authReducer from '../features/authReducer/authSlice.js'
import goalReducer from '../features/goalReducer/goalSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalReducer
  },
});
