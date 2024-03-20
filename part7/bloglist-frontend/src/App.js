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
    <div className="center-content">
      <div className="login-form">
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input id="username" type="text" name="Username" />
          </div>
          <div>
            <label>Password:</label>
            <input id="password" type="text" name="Password" />
          </div>
          <button id="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
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
      <div className="blog-list">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Link className="blog" key={blog.id} to={`/blogs/${blog.id}`}>
              <span className="blog-title">{blog.title}</span>
              <span className="blog-by">by</span>
              <span className="blog-author">{blog.author}</span>
            </Link>
          ))}
      </div>
    </div>
  );

  return (
    <main>
      <Notification />

      {!user ? (
        loginForm()
      ) : (
        <Router>
          <div className="navigation">
            <div className="navigation-content">
              <div className="section">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/users">
                  Users
                </Link>
                <Link className="nav-link" to="/create">
                  Create blog
                </Link>
              </div>

              <div className="section">
                <span>{user.name}</span>
                <form onSubmit={handleLogout}>
                  <button type="submit">Logout</button>
                </form>
              </div>
            </div>
          </div>

          <div className="main-content">
            <h1>Blogs</h1>
            <Routes>
              <Route path="/" element={blogOverview()} />
              <Route path="/users" element={<Users />} />
              <Route path="/create" element={<BlogForm />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<Blog />} />
            </Routes>
          </div>
        </Router>
      )}
    </main>
  );
};

export default App;
