import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getBlogs = () => {
  const response = axios.get(baseUrl);
  return response.then((response) => response.data);
};

export const getBlog = (id) => {
  const response = axios.get(`${baseUrl}/${id}`);
  return response.then((response) => response.data);
}

export const addBlog = (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = axios.post(baseUrl, newBlog, config);
  return response.then((response) => response.data);
};

export const updateBlog = (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config,
  );
  return response.then((response) => response.data);
};

export const removeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${blog.id}`, config);
  return blog;
};

export default { setToken };
