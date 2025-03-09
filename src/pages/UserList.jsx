import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/apiService";
import Enumerable from "linq";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // LINQ-like filter to get only active users
  const activeUsers = Enumerable.from(users).where(user => user.isActive).toArray();

  return (
    <div className="container mt-4">
      <h2>User List</h2>
      <ul className="list-group">
        {activeUsers.map((user) => (
          <li key={user.id} className="list-group-item">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
