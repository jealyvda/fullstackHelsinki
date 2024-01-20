import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
//import Togglable from "./components/Togglable";
import blogService, {
  getBlogs,
  addBlog,
  updateBlog,
  removeBlog,
} from "./services/blogs";
import loginService from "./services/login";
import { notificationDispatch } from "./context/NotificationContext";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const queryClient = useQueryClient();

  // Notification messages
  const dispatch = notificationDispatch();

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
    console.log(result.isSuccess);
    console.log(result.data);
    blogs = result.data;
  }

  // Create a new blog
  const newBlogMutation = useMutation({
    mutationFn: addBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], [...blogs, newBlog]);
      dispatch({
        type: "showNotification",
        payload: {
          message: `${newBlog.title} from ${newBlog.author} successfully created`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({ type: "hideNotification" });
      }, 5000);
    },
    onError: (newBlog) => {
      dispatch({
        type: "showNotification",
        payload: {
          message: `${newBlog.title} could not be created`,
          type: "error",
        },
      });
      setTimeout(() => {
        dispatch({ type: "hideNotification" });
      }, 5000);
    },
  });

  const createBlog = async (blog) => {
    newBlogMutation.mutate(blog);
  };

  // Update the likes of a blogpost
  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (changedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], [...blogs, changedBlog]);
      dispatch({
        type: "showNotification",
        payload: {
          message: `${changedBlog.title} from ${changedBlog.author} successfully liked`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({ type: "hideNotification" });
      }, 5000);
    },
    onError: () => {
      dispatch({
        type: "showNotification",
        payload: { message: `Blog could not be liked`, type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "hideNotification" });
      }, 5000);
    },
  });

  const updateLikes = (id) => {
    const blog = blogs.find((n) => n.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlogMutation.mutate(changedBlog);
  };

  // Delete a blogpost
  const deleteBlogMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      dispatch({
        type: "showNotification",
        payload: {
          message: `${data.title} from ${data.author} successfully deleted`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({ type: "hideNotification" });
      }, 5000);
    },
    onError: () => {
      dispatch({
        type: "showNotification",
        payload: { message: `Blog could not be deleted`, type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "hideNotification" });
      }, 5000);
    },
  });

  const deleteBlog = async (id) => {
    const blog = blogs.find((n) => n.id === id);
    if (
      window.confirm(
        `Do you really want to delete ${blog.title} by ${blog.author}?`,
      )
    ) {
      deleteBlogMutation.mutate(id);
      dispatch({
        type: "showNotification",
        payload: {
          message: `${blog.title} from ${blog.author} successfully deleted`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({ type: "hideNotification" });
      }, 5000);
    }
  };

  // Login users
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
      dispatch({
        type: "showNotification",
        payload: {
          message: `${user.name} is succesfully logged in.`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({ type: "hideNotification" });
      }, 5000);
    } catch (exception) {
      dispatch({
        type: "showNotification",
        payload: { message: "Wrong credentials", type: "error" },
      });
      console.log(exception);
      setTimeout(() => {
        dispatch({ type: "hideNotification" });
      }, 5000);
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
    setTimeout(() => {
      dispatch({ type: "hideNotification" });
    }, 5000);

    setUser(null);

    window.localStorage.clear();
  };

  // Login form
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

  // Overview of all blogs
  const blogOverview = () => (
    <div>
      <h1>Blogs</h1>
      <p>{user.name} logged in</p>
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
      <BlogForm createBlog={createBlog} />
      <div className="blog">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={() => updateLikes(blog.id)}
              removeBlog={() => deleteBlog(blog.id)}
              user={user}
            />
          ))}
      </div>
    </div>
  );

  return (
    <div>
      {<Notification />}
      {user === null ? loginForm() : blogOverview()}
    </div>
  );
};

export default App;
