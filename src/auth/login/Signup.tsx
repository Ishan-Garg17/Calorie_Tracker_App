import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import "./login.scss";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const btnPointer = document.querySelector(
      "#login-btn"
    ) as HTMLButtonElement;
    btnPointer.innerHTML = '<i class="fa fa-spinner fa-spin"></i>Loading';
    btnPointer.setAttribute("disabled", "true");
    const formDataJSON = {
      name: name,
      email: email,
      password: password,
    };
    ctx.onSignup(formDataJSON);
    if (ctx.error) {
      e.currentTarget.reset();
      btnPointer.innerHTML = "SignUp";
      btnPointer.removeAttribute("disabled");
    } else {
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  return (
    <div className="login_screen extra">
      <form onSubmit={signupHandler}>
        <div className="">
          <label htmlFor="name">Enter Name</label>
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>
        <div className="">
          <label htmlFor="email">Enter Email</label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className="">
          <label htmlFor="password">Enter Password</label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button id="login-btn" type="submit">
          SignUp
        </button>
        <button
          onClick={() => navigate("/auth/login")}
          id="login-btn"
          type="button"
        >
          Existing User? Login
        </button>
      </form>
    </div>
  );
}

export default Signup;
