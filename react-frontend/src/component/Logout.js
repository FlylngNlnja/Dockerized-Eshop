import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './NavBar.css';


const Logout = () => {
    function myprofileinfo(){
        window.location.href = "/MyProfileInfo";
    }
    const navigate = useNavigate();

    function logout(){
        if(sessionStorage.getItem('token')){
            sessionStorage.removeItem("token");
            navigate('/');
            window.location.reload();
        }
    }
    return (
        <div id="regpopup">
            <Link className="login-button" to="/MyProfileInfo">Profile</Link>
            <button className="logout-button" onClick={logout}> Logout </button>
        </div>

    );


};



export default Logout;
