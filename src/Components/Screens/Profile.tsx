import React from "react";
import { useContext } from "react";
import AuthContext from "../../auth/AuthContext";
import "./profile.scss"; // Import the CSS file

const Profile = () => {
  const ctx = useContext(AuthContext);
  const { name, email } = ctx.user;
  console.log("profile page", name, email, ctx.user);

  return (
    <div className="user-profile">
      <img src="https://via.placeholder.com/150" alt="User profile" />
      <h1>User Name -: {name}</h1>
      <p>Email: {email}</p>
      <p>Location: Some City, Some Country</p>
    </div>
  );
};

export default Profile;
