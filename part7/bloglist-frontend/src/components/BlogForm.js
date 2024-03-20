import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationDispatch } from "../context/Notification";
import { addBlog } from "../services/blogs";

const BlogForm = () => {
  const queryClient = useQueryClient();

  const notify = notificationDispatch();

  const addNewBlog = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;

    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";

    newBlogMutation.mutate({
      title: title,
      author: author,
      url: url,
    });
  };

  // Create a new blog
  const newBlogMutation = useMutation({
    mutationFn: addBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], [...blogs, newBlog]);
      notify({
        type: "showNotification",
        payload: {
          message: `${newBlog.title} from ${newBlog.author} successfully created`,
          type: "success",
        },
      });
    },
    onError: (newBlog) => {
      notify({
        type: "showNotification",
        payload: {
          message: `${newBlog.title} could not be created`,
          type: "error",
        },
      });
    },
  });

  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={addNewBlog}>
        <div>
          title
          <input type="text" id="title" name="Title" placeholder="title" />
        </div>
        <div>
          author
          <input type="text" id="author" name="Author" placeholder="author" />
        </div>
        <div>
          URL
          <input type="text" id="url" name="URL" placeholder="url" />
        </div>
        <button id="create-blog" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
