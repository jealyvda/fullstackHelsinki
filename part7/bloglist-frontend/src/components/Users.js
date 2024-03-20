import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getUsers } from "../services/users";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await getUsers();
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchUsers();
    }, []);

    return (
        <div>
            Users
            <table>
        <thead>
          <tr>
            <th></th>
            <th>Number of Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}

export default Users;