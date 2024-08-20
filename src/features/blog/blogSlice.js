import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Thunks for API calls
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addBlog = createAsyncThunk('blogs/addBlog', async (newBlog) => {
  const response = await axios.post(API_URL, newBlog);
  return response.data;
});

export const updateBlog = createAsyncThunk('blogs/updateBlog', async (updatedBlog) => {
  const response = await axios.put(`${API_URL}/${updatedBlog.id}`, updatedBlog);
  return response.data;
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(blog => blog.id === action.payload.id);
        if (index >= 0) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
      });
  }
});

export default blogSlice.reducer;
