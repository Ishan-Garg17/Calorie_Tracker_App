import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import { AuthContextProviderProps } from "../Components/Screens/types/types";

const ProtectedRoute: React.FC<AuthContextProviderProps> = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const ctx = useContext(AuthContext);
  useEffect(() => {
    console.log("protected Route", ctx);
    if (ctx.token !== "" && ctx.user.role === "user") {
      setIsLoggedIn(true);
      // navigate('/')
    } else {
      navigate("/auth/login");
    }
  }, [ctx.token]);

  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};

export default ProtectedRoute;
