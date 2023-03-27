import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (ctx.token !== "") {
      if (ctx.user.role === "admin") {
        setIsLoggedIn(true);
        // navigate('/admin')
      } else if (ctx.user.role === "user") {
        navigate("/notFound");
      }
    } else {
      navigate("/auth/login");
    }
  }, [ctx.token, ctx.user.role, navigate]);

  return <>{isLoggedIn ? props.children : null}</>;
};

export default ProtectedAdminRoute;
