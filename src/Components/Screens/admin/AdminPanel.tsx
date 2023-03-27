import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../../auth/AuthContext";
import UserList from "./UserList";
import "./admin.scss";
import { User } from "../../../types/types";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [fetchData, setFetchData] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3003/user", {
          headers: { "Content-Type": "application/json", token: ctx.token },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
    console.log(ctx);
  }, [fetchData, ctx.token]);

  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3003/user/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", token: ctx.token },
      });
      setFetchData(!fetchData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-list">
      <h2>Admin Panel</h2>
      <button className="logout_btn" onClick={() => ctx.onLogout()}>
        LogOut
      </button>
      <div className="user-list">
        {users.map((user) => (
          <UserList
            key={user.id}
            fetchData={fetchData}
            setFetchData={setFetchData}
            deleteUser={deleteUser}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
