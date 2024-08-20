import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog, updateBlog } from '../features/blog/blogSlice';

const BlogPostForm = ({ blog }) => {
  const [title, setTitle] = useState(blog ? blog.title : '');
  const [body, setBody] = useState(blog ? blog.body : '');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (blog) {
      dispatch(updateBlog({ id: blog.id, title, body }));
    } else {
      dispatch(addBlog({ title, body }));
    }
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{blog ? 'Edit Blog' : 'Add Blog'}</h3>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Body:
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      </label>
      <br />
      <button type="submit">{blog ? 'Update' : 'Add'} Blog</button>
    </form>
  );
};

export default BlogPostForm;
