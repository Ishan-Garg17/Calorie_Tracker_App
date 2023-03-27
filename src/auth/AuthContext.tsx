import React from "react";
import jwt_decode from "jwt-decode";
// import { User } from "../Components/Home/types/types";
import { createContext, useEffect, useState } from "react";
import { AuthContextProviderProps } from "../types/types";
interface User {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}
interface AuthContextProps {
  isLoggedin: boolean;
  fetchData: boolean;
  onLogout: () => void;
  onSignup: (formDataJSON: object) => Promise<void>;
  onLogin: (email: string, password: string) => Promise<void>;
  onSetFetchData: () => void;
  token: string;
  user: User;
  error: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedin: false,
  fetchData: false,
  onLogout: () => {},
  onSignup: () => Promise.resolve(),
  onLogin: () => Promise.resolve(),
  onSetFetchData: () => {},
  token: "",
  user: { id: 0 },
  error: false,
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isLoggedin, setLoggedin] = useState<boolean>(false);
  const [fetchData, setFetchData] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User>({});
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      const token = localStorage.getItem("access-token") || "";
      const { user } = jwt_decode(token) as any;
      console.log("in authContext when reload", user, token);
      setToken(token);
      setUser(user);
    }
  }, []);

  const fetchDataHandler = () => {
    setFetchData(!fetchData);
  };

  const logoutHandler = () => {
    localStorage.removeItem("access-token");
    setToken("");
  };

  const loginHandler = async (email: string, password: string) => {
    const formDataJSON = {
      email: email,
      password: password,
    };
    const res = await fetch("http://localhost:3003/user/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataJSON),
    });
    const data = await res.json();
    console.log(data);

    const { token, ...user } = data;
    console.log("in authContext", user);

    if (!token) {
      alert("Unable to login. Please try after some time.");
      setError(true);
      return;
    } else {
      localStorage.clear();
      localStorage.setItem("access-token", token);
      setToken(token);
      setUser(user);
    }
  };

  const signupHandler = async (formDataJSON: object) => {
    const res = await fetch("http://localhost:3003/user/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataJSON),
    });
    const data = await res.json();
    console.log(data);
    const { token } = data;
    if (!token) {
      alert("Unable to login. Please try after some time.");
      setError(true);
      return;
    } else {
      localStorage.clear();
      localStorage.setItem("access-token", token);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedin: isLoggedin,
        fetchData: fetchData,
        onSetFetchData: fetchDataHandler,
        onLogout: logoutHandler,
        onSignup: signupHandler,
        onLogin: loginHandler,
        token: token,
        user: user,
        error: error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
