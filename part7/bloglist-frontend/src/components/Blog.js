import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { notificationDispatch } from "../context/Notification";
import { useUserValue } from "../context/User";
import { removeBlog, updateBlog } from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog }) => {
  const queryClient = useQueryClient();

  const notify = notificationDispatch();

  const user = useUserValue();

  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const updateLikes = (id) => {
    const blogs = queryClient.getQueryData(["blogs"]);
    const blog = blogs.find((n) => n.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlogMutation.mutate(changedBlog);
  };

  // Remove blog
  const deleteBlog = async (id) => {
    const blogs = queryClient.getQueryData(["blogs"]);
    const blog = blogs.find((n) => n.id === id);
    const message = `Do you really want to delete ${blog.title} by ${blog.author}?`;

    if (window.confirm(message)) {
      deleteBlogMutation.mutate(blog);
    }
  };

  // Update the likes of a blogpost
  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (changedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) => {
          return blog.id === changedBlog.id ? changedBlog : blog;
        }),
      );
      notify({
        type: "showNotification",
        payload: {
          message: `${changedBlog.title} from ${changedBlog.author} successfully liked`,
          type: "success",
        },
      });
    },
    onError: () => {
      notify({
        type: "showNotification",
        payload: { message: `Blog could not be liked`, type: "error" },
      });
    },
  });

  // Delete a blogpost
  const deleteBlogMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      console.log(data);
      notify({
        type: "showNotification",
        payload: {
          message: `${data.title} from ${data.author} successfully deleted`,
          type: "success",
        },
      });
    },
    onError: () => {
      notify({
        type: "showNotification",
        payload: { message: `Blog could not be deleted`, type: "error" },
      });
    },
  });

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        Title: {blog.title} <br />
        Author: {blog.author}
        <button onClick={toggleVisibility} id="view">
          view
        </button>
      </div>
      <div style={showWhenVisible} className="blogContent">
        Title: {blog.title} <button onClick={toggleVisibility}>hide</button>
        <br />
        Author:{blog.author} <br />
        URL: {blog.url} <br />
        Likes: {blog.likes}{" "}
        <button id="like-button" onClick={() => updateLikes(blog.id)}>
          like
        </button>
        <br />
        {blog.user.username === user.username ? (
          <button onClick={() => deleteBlog(blog.id)}>delete</button>
        ) : null}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
  }),
};

export default Blog;
