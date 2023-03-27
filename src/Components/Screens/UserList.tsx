import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import { User } from "./types/types";
import axios from "axios";

interface UserListProps {
  user: User;
  deleteUser: (userId: number) => void;
  setFetchData: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: boolean;
}

function UserList({
  user,
  deleteUser,
  setFetchData,
  fetchData,
}: UserListProps) {
  const [editUser, setEditUser] = useState<User | false>(false);
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const editHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const item = {
      name: userName,
      email: userEmail,
    };
    try {
      const response = await axios.put(
        `http://localhost:3003/user/edit/${user.id}`,
        item,
        {
          headers: {
            token: ctx.token,
          },
        }
      );
      setEditUser(false);
      setFetchData(!fetchData);
    } catch (error) {
      window.alert("Please Try Again with proper name and email");
      setEditUser(false);
    }
  };

  return (
    <>
      {editUser && (
        <>
          <div className="edit_container"></div>
          <form className="edit_form" onSubmit={(e) => editHandler(e)}>
            <label>Edit Name</label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
            />
            <label>Edit Email</label>
            <input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              type="text"
            />
            <button type="submit">Save Changes</button>
            <button onClick={() => setEditUser(false)} type="button">
              Cancel
            </button>
          </form>
        </>
      )}
      <div key={user.id} className="user-card">
        <div className="user-info">
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
        </div>
        <div className="user-actions">
          <button onClick={() => setEditUser(user)}>Edit</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
          <button onClick={() => navigate(`/admin/food/${user.id}`)}>
            Food Items
          </button>
          <button onClick={() => navigate(`/report/${user.id}`)}>
            Reporting Screen
          </button>
        </div>
      </div>
    </>
  );
}

export default UserList;
