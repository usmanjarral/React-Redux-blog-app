import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './features/blog/blogSlice';

const store = configureStore({
  reducer: {
    blog: blogReducer
  }
});

export default store;
