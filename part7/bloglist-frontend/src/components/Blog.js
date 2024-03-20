import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { notificationDispatch } from "../context/Notification";
import { useUserValue } from "../context/User";
import { removeBlog, updateBlog, getBlog } from "../services/blogs";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const Blog = ({ blog }) => {
  const [currentBlog, setBlog] = useState(blog);
  const id = useParams().id;
  const queryClient = useQueryClient();

  const notify = notificationDispatch();

  const user = useUserValue();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlog(id);
        setBlog(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (blog === undefined) {
      fetchBlog();
    } else {
      setBlog(blog);
    }
  }, []);

  const updateLikes = (blog) => {
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlogMutation.mutate(changedBlog);
  }; 

  const addComment = (event, blog) => {
    event.preventDefault();
    const comment = event.target.comment.value;

    event.target.comment.value = "";
    const changedBlog = { ...blog, comments: [...blog.comments, comment]}
    console.log(changedBlog);
    updateBlogMutation.mutate(changedBlog);
  }

  // Remove blog
  const deleteBlog = async (blog) => {
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
      setBlog(changedBlog);
      notify({
        type: "showNotification",
        payload: {
          message: `${changedBlog.title} by ${changedBlog.author} successfully updated`,
          type: "success"
        },
      });
    },
    onError: () => {
      notify({
        type: "showNotification",
        payload: { message: `Blog could not be updated`, type: "error" },
      });
    },
  });

  // Delete a blogpost
  const deleteBlogMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
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

  if (currentBlog) {
    return (
      <div>
      <div style={blogStyle}>
        <div className="blogContent">
          <h2>Title: {currentBlog.title}</h2>
          <br />
          Author:{currentBlog.author} <br />
          URL: {currentBlog.url} <br />
          Likes: {currentBlog.likes}{" "}
          <button id="like-button" onClick={() => updateLikes(currentBlog)}>
            like
          </button>
          <br />
          {currentBlog.user.username === user.username ? (
            <button onClick={() => deleteBlog(currentBlog)}>delete</button>
          ) : null}
        </div>
      </div>

      <h3>Comments</h3>
      <form onSubmit={(e) => addComment(e, currentBlog)}>
        <input type="text" id="comment"></input>
        <button type="submit">Comment</button>
      </form>

      {currentBlog.comments.length > 0 ? 
        <ul key={currentBlog.comments.length}>
          {currentBlog.comments.map((comment) => <li key={comment}>{comment}</li>)}
        </ul>
      : null}
      </div>
    );
  } else {
    return null;
  }
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
