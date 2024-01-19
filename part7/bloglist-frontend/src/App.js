import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [succesMessage, setSuccesMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      console.log(user);
      setUser(user);
      setUsername("");
      setPassword("");
      setSuccesMessage(`${user.name} is succesfully logged in!`);
      setTimeout(() => {
        setSuccesMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    blogService.setToken(null);
    setSuccesMessage(`${user.name} is succesfully logged out.`);
    setTimeout(() => {
      setSuccesMessage(null);
    }, 5000);

    setUser(null);

    window.localStorage.clear();
  };

  const loginForm = () => (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );

  const createBlog = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(createdBlog));
      setSuccesMessage(
        `${createdBlog.title} by ${createdBlog.author} is succesfully added`,
      );
      setTimeout(() => {
        setSuccesMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Can not add blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const updateLikes = async (id) => {
    const blog = blogs.find((n) => n.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    try {
      const updatedBlog = await blogService.update(id, changedBlog);
      setBlogs(blogs.map((n) => (n.id !== id ? n : updatedBlog)));
      setSuccesMessage(`${updatedBlog.title} has been succesfully liked!`);
      setTimeout(() => {
        setSuccesMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Can not like this blog");
      console.log(changedBlog);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const removeBlog = async (id) => {
    const blog = blogs.find((n) => n.id === id);
    if (
      window.confirm(
        `Do you really want to delete ${blog.title} by ${blog.author}?`,
      )
    ) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter((n) => n.id !== id));
        setSuccesMessage(
          `${blog.title} by ${blog.author} has been succesfully deleted`,
        );
        setTimeout(() => {
          setSuccesMessage(null);
        }, 5000);
      } catch (exception) {
        setErrorMessage("Can not delete this blog");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  const blogFormRef = useRef();

  const blogOverview = () => (
    <div>
      <h1>Blogs</h1>
      <p>{user.name} logged in</p>
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <div className="blog">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={() => updateLikes(blog.id)}
              removeBlog={() => removeBlog(blog.id)}
              user={user}
            />
          ))}
      </div>
    </div>
  );
  return (
    <div>
      <Notification message={errorMessage} type={"error"} />
      <Notification message={succesMessage} type={"succes"} />
      {user === null ? loginForm() : blogOverview()}
    </div>
  );
};

export default App;
