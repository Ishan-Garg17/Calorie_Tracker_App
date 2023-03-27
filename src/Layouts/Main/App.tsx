import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

import Navbar from '../Navbar/Navbar';

import { Outlet, useNavigate } from 'react-router';
import { checkUserToken } from '../../API/CheckToken';
import { useContext } from 'react';
import AuthContext from '../../auth/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const ctx = useContext(AuthContext);

  useEffect(() => {
    console.log("protected Route", ctx)
    if (ctx.token !== '' && ctx.user.role === 'user') {
      setIsLoggedIn(true)
    }
    else {
      navigate('/auth/login')
      setIsLoggedIn(false)
    }

  }, [ctx.token]);

  return (
    <React.Fragment>
      {isLoggedIn && <Navbar />}
      <Outlet />
    </React.Fragment>

  );
}

export default App;