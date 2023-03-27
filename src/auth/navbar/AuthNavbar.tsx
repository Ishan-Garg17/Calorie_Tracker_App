import React from "react";
import "../../Layouts/Navbar/navbar.scss";
const AuthNavbar = () => {
  return (
    <React.Fragment>
      <div className="navbar">
        <span className="logo">CalorieTrack</span>
        <span style={{ width: "25%", textAlign: "center" }}>
          Welcome To CalorieTrack
        </span>
      </div>
    </React.Fragment>
  );
};

export default AuthNavbar;
