import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs, deleteBlog } from '../features/blog/blogSlice';
import BlogPostForm from './BlogPostForm';

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);
  const blogStatus = useSelector((state) => state.blog.status);
  const error = useSelector((state) => state.blog.error);

  useEffect(() => {
    if (blogStatus === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  return (
    <div>
      <h2>Blog Posts</h2>
      <BlogPostForm />
      {error && <p>{error}</p>}
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.body}</p>
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
