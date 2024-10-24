import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './reducers/movieSlice';
import tvReducer from './reducers/tvSlice';
import personReducer from './reducers/personSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',  // This ensures DevTools is enabled in non-production environments
});
