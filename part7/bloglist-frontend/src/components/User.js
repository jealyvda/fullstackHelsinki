import { useState ,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../services/blogs";
import { getUser } from "../services/users";

const User = () => {
  const id = useParams().id;
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUser(id);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

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
    blogs = result.data.filter((blog) => blog.user.id === id);
  }

  return (
    <div>
        <h1>{user.name}</h1>
        <p>Has created blogs:</p> 
        <ul>
        {blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
        ))}
        </ul>
    </div>
    );
};

export default User;
