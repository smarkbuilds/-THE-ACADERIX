import { configureStore } from '@reduxjs/toolkit';
import revisionReducer from './revisionSlice';

export const store = configureStore({
  reducer: {
    revision: revisionReducer
  }
});

export default store;
