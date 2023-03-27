import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router'
import AuthContext from '../../auth/AuthContext';
import './navbar.scss'

function Navbar() {
    const navigate = useNavigate()
    const ctx = useContext(AuthContext);

    const logoutHandler = () => {
        ctx.onLogout()
        navigate('/auth/login')
    }

    return (
        <div className='navbar'>
            <span onClick={() => navigate('/')} className='logo'>CalorieTrack</span>
            <ul className='navlinks'>
                <li onClick={logoutHandler}>Logout</li>
                <li onClick={() => navigate('/profile')}>Profile</li>
                <li>Invite a Friend</li>
            </ul>
        </div>
    )
}

export default Navbar