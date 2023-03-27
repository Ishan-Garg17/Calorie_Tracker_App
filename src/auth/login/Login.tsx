import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../AuthContext";
import "./login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  useEffect(() => {
    console.log("token Changed", ctx.token, ctx.user, ctx);
    if (ctx.token !== "") {
      if (ctx.user.role === "admin") {
        navigate("/admin");
      } else if (ctx.user.role === "user") {
        navigate("/");
      }
    }
  }, [ctx.token, ctx.user, navigate]);

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const btnPointer = document.querySelector("#login-btn") as any;
    if (btnPointer) {
      btnPointer.innerHTML = '<i class="fa fa-spinner fa-spin"></i>Loading';
      btnPointer.setAttribute("disabled", "true");
    }
    ctx.onLogin(email, password);
    if (ctx.error) {
      e.currentTarget.reset();
      btnPointer.innerHTML = "Login";
      btnPointer.removeAttribute("disabled");
    } else {
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  return (
    <div className="login_screen">
      <form onSubmit={loginHandler}>
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
        <button className="login-btn" type="submit">
          Login
        </button>
        <button
          onClick={() => navigate("/auth/signup")}
          className="signup-btn"
          type="button"
        >
          Create new Account
        </button>
      </form>
    </div>
  );
}

export default Login;
