import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row, Dropdown } from 'react-bootstrap';
import LogRegPopup from './LogRegPopup';
import './NavBar.css';
import $ from 'jquery';
import Logout from "./Logout";

const NavBar = () => {
    const navigate = useNavigate();
    const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
    const [isLoggedin, setLoggedin] = useState(false);
    const [cart, setCart] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            $('#isshow').hide();
            setLoggedin(true);
        }else{
            setLoggedin(false);
        }
    }, []);





    function toggleProfilePopup() {
        if (document.cookie.indexOf('token=') !== -1) {
            $('#isshow').hide();
        } else {
            $('#isshow').show();
        }
        if (!$('#isshow').length) {
            navigate('/MyProfile');
        } else {
            setProfilePopupOpen(!isProfilePopupOpen);
        }
    }



    function addToCart(product) {
        const newCart = [...cart, product];
        const newTotalCost = totalCost + product.price;
        setCart(newCart);
        setTotalCost(newTotalCost);
    }


    return (
        <nav className="navbar" style={{position: "sticky", top:"0",height:"8em"}}>
            <div className="nav nav-pills nav-justified" style={{width:"100%",height:"100%"}}>
                <div style={{display:"flex",width:"100%",height:"100%"}}>
                    <div style={{display:"flex",width:"100%",height:"100%"}}>
                        <Link to="/" className="text-dark nav-item nav-link text-decoration-none" style={{fontWeight:"700",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent: "center"}}> Home </Link>
                        {isLoggedin && (<Link to="/MyProfile" className="text-dark nav-item nav-link text-decoration-none" style={{fontWeight:"700",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent: "center"}}>Orders</Link>)}
                        <Dropdown>
                            <Dropdown.Toggle  className="text-dark nav-item nav-link text-decoration-none" id="dropdown-basic" style={{height:"100%",width:"100%",fontWeight:"700"}}>
                                Products
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Link className="text-dark nav-item nav-link text-decoration-none"  to="Products/3">PC & Laptops</Link>
                                <Link className="text-dark nav-item nav-link text-decoration-none"  to="Products/1">Smartphones</Link>
                                <Link className="text-dark nav-item nav-link text-decoration-none"  to="Products/2">Τηλεοράσεις</Link>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="container" style={{justifyContent: "flex-end",height:"100%"}}>
                        <button className="rotate-on-hover" onClick={toggleProfilePopup}>
                            <img src="/Media/profile.png" alt="Profile Icon" />
                        </button>
                        <Link to="/CartPage" className="rotate-on-hover">
                            <img src="/Media/Cart.png" alt="Cart Icon" />
                        </Link>
                    </div>
                </div>
                <div id="isshow">
                    {isProfilePopupOpen ? (
                        <div className="popup" id="regpopup">
                            {isLoggedin ? <Logout/> : (
                                <div id="regpopup">
                                    <div style={{color: "black", marginTop: "1em"}}>Already Registered?</div>
                                    <button className="login-button" onClick={toggleProfilePopup}><Link to="/Login"
                                                                                                 className="nav-item nav-link text-decoration-none"
                                                                                                 style={{color: "white"}}>Login</Link>
                                    </button>
                                    <div style={{color: "black", marginTop: "1em"}}>New User?</div>
                                    <button className="register-button" onClick={toggleProfilePopup}><Link to="/Register"
                                                                                                    className="nav-item nav-link text-decoration-none"
                                                                                                    style={{color: "black"}}>Register</Link>
                                    </button>
                                </div>)}
                        </div>
                    ) : null}

                </div>
            </div>
        </nav>
    );
};

export default NavBar;
