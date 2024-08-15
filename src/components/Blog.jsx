import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const Blog = ({ blog, user, setBlogs, blogs }) => {
  const [details, setDetails] = useState(false);
  const queryClient = useQueryClient();
  const putBlogMutation = useMutation({
    mutationFn: blogService.put,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  const handleDetails = () => {
    setDetails(!details);
  };

  const handleLike = () => {
    blogService.setToken(user.token);
    const object = {
      user: blog.user.id,
      title: blog.title,
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url,
      id: blog.id,
    };

    try {
      blogService.put(object).then(() => {
        const b = blog;
        const bChange = { ...b, likes: blog.likes + 1 };
        setBlogs(blogs.map((vlog) => (vlog.id === blog.id ? bChange : vlog)));
        // console.log(blogs)
      });
    } catch (error) {
      console.log("error");
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const view = () => {
    return (
      <div data-testid="blog-view">
        {blog.title} {blog.author}{" "}
        <button onClick={handleDetails} data-testid="view-button">
          view
        </button>
      </div>
    );
  };

  const handleRemove = () => {
    const response = window.confirm(
      `Removing blog ${blog.title} by ${blog.author}`
    );
    if (response === true) {
      blogService.setToken(user.token);
      blogService.eliminar(blog.id).then(() => {
        setBlogs(blogs.filter((vlog) => vlog.id !== blog.id));
      });
    }
  };

  const hide = () => {
    return (
      <div data-testid="blogHide">
        {blog.title} {blog.author} <button onClick={handleDetails}>hide</button>
        <p>{blog.url}</p>
        <p>
          <span>likes </span>
          {blog.likes} <button onClick={handleLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {blog.user.name === user.name ? (
          <button onClick={handleRemove}>remove</button>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div style={blogStyle}>
      <div>{details === false ? view() : hide()}</div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  // setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
};

export default Blog;
