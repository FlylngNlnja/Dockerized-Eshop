import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './NavBar.css';
import $ from "jquery";


const Logout = () => {

    const navigate = useNavigate();

    function logout(){
        if(sessionStorage.getItem('token')){
            $('#regpopup').hide();
            sessionStorage.removeItem("token");
            navigate('/');
            window.location.reload();
        }
    }
    function togglepopup() {
            $('#regpopup').hide();
    }
    return (
        <div id="regpopup">
            <Link onClick={togglepopup} className="profile-button" to="/MyProfileInfo">Profile</Link>
            <button className="logout-button" onClick={logout}> Logout </button>
        </div>

    );


};



export default Logout;
