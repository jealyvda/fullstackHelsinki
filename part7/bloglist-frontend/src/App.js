import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
//import Togglable from "./components/Togglable";
import blogService, { getBlogs } from "./services/blogs";
import loginService from "./services/login";
import { notificationDispatch } from "./context/Notification";
import UserContext from "./context/User";
import Users from "./components/Users";
import User from "./components/User";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const [user, userDispatch] = useContext(UserContext);

  // Notification messages
  const dispatch = notificationDispatch();

  // Login users
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "setUser", payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    event.target.password.value = "";
    event.target.username.value = "";

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({ type: "setUser", payload: user });

      dispatch({
        type: "showNotification",
        payload: {
          message: `${user.name} is succesfully logged in.`,
          type: "success",
        },
      });
    } catch (exception) {
      dispatch({
        type: "showNotification",
        payload: { message: "Wrong credentials", type: "error" },
      });
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    blogService.setToken(null);
    dispatch({
      type: "showNotification",
      payload: {
        message: `${user.name} is succesfully logged out.`,
        type: "success",
      },
    });

    userDispatch({ type: "clearUser" });

    window.localStorage.clear();
  };

  // Login form
  const loginForm = () => (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id="username" type="text" name="Username" />
        </div>
        <div>
          password
          <input id="password" type="text" name="Password" />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );

  // Fetch the full blog-list
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) return <div>Loading blogs...</div>;
  if (result.isError)
    return <div>An error has occurred: {result.error.message}</div>;

  let blogs = [];

  if (result.isSuccess) {
    blogs = result.data;
  }

  // Overview of all blogs
  const blogOverview = () => (
    <div>
      <BlogForm />
      <div className="blog">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div>
      <Notification />
      <Router>
        <div className="navigation">
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>

          <div>
            <span>{user.name}</span>
            <form onSubmit={handleLogout}>
              <button type="submit">logout</button>
            </form>
          </div>
        </div>

        {user === null ? loginForm() : null}

        <h1>Blogs</h1>
        <Routes>
          <Route path="/" element={blogOverview()} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
