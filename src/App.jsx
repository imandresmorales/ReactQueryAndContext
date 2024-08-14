import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import NewBlogForm from "./components/NewBlogForm";

import { useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "notification":
      return action.payload;
    case "error":
      return action.payload;
    case "hide":
      return null;
    default:
      return state;
  }
};

const showNotification = (message) => {
  return {
    type: "notification",
    payload: message,
  };
};

const showError = (message) => {
  return {
    type: "error",
    payload: message,
  };
};

const hideNotification = () => {
  return {
    type: "hide",
    payload: "",
  };
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null);
  const [blogVisible, setBlogVisible] = useState(false);

  const [message, messageDispatch] = useReducer(notificationReducer, null);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) => {
        console.log("error App.jsx");
        return [];
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const Notification = ({ message }) => {
    if (message === null) return null;
    const css = {
      color: "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };

    return (
      <div style={css}>
        <p>{message}</p>
      </div>
    );
  };

  const ErrorMessage = ({ message }) => {
    if (message === null) return null;
    const css = {
      color: "red",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };
    return (
      <div style={css}>
        <p>{message}</p>
      </div>
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const loginForm = () => {
    return (
      <>
        <ErrorMessage message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleCreate = (event) => {
    event.preventDefault();
    try {
      blogService.setToken(user.token);
      blogService
        .create({ title: title, author: author, url: url })
        .then((returnedBlog) => {
          setBlogs(
            blogs.concat({
              ...returnedBlog,
              user: {
                username: user.username,
                name: user.name,
                id: returnedBlog.id,
              },
            })
          );
          setAuthor("");
          setTitle("");
          setUrl("");
          setBlogVisible(!blogVisible);

          messageDispatch(
            showNotification(`a new blog ${title} by ${author} added`)
          );
          setTimeout(() => {
            messageDispatch(hideNotification());
          }, 2000);
        });
    } catch (error) {
      messageDispatch(showError("error"));
      setTimeout(() => {
        messageDispatch(hideNotification());
      }, 2000);
    }
  };

  const handleNewBlog = () => {
    setBlogVisible(!blogVisible);
  };

  const blogForm = () => {
    return (
      <>
        <div>
          <h2>blogs</h2>
          <Notification message={message} />
          <span>{user.name} logged in </span>
          <button onClick={handleLogout}>logout</button>
          <div>
            {blogVisible === true ? (
              <NewBlogForm
                title={title}
                setTitle={setTitle}
                author={author}
                setAuthor={setAuthor}
                url={url}
                setUrl={setUrl}
                handleCreate={handleCreate}
                handleNewBlog={handleNewBlog}
              />
            ) : (
              <button onClick={handleNewBlog}>create new blog</button>
            )}
          </div>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                setBlogs={setBlogs}
                blogs={blogs}
              />
            ))}
        </div>
      </>
    );
  };

  return <div>{user === null ? loginForm() : blogForm()}</div>;
};

export default App;
