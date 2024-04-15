import React, {useState, useEffect, useRef} from 'react';
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
    const popupRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setProfilePopupOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setLoggedin(true);
        }else{
            setLoggedin(false);
        }
    }, []);





    function toggleProfilePopup() {
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
                        <Link to="/" className="text-white nav-item nav-link text-decoration-none" style={{fontWeight:"700",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent: "center"}}> Home </Link>

                        <Dropdown className="nav-item">
                            <Dropdown.Toggle  className="text-white nav-item nav-link text-decoration-none" id="dropdown-basic" style={{height:"100%",width:"100%",fontWeight:"700"}}>
                                Products
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Link className="text-dark nav-item nav-link text-decoration-none"  to="Products/3">PC & Laptops</Link>
                                <Link className="text-dark nav-item nav-link text-decoration-none"  to="Products/1">Smartphones</Link>
                                <Link className="text-dark nav-item nav-link text-decoration-none"  to="Products/2">Τηλεοράσεις</Link>
                            </Dropdown.Menu>
                        </Dropdown>
                        {isLoggedin && (<Link to="/MyProfile" className="text-white nav-item nav-link text-decoration-none" style={{fontWeight:"700",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent: "center"}}>Orders</Link>)}
                    </div>

                    <div className="container" style={{justifyContent: "flex-end",height:"100%"}}>
                        <div className="top_right_button">
                            <button className="text-decoration-none text-white" onClick={toggleProfilePopup} style={{background:"none",border:"none",cursor:"pointer"}}>
                                <i className="fa-solid fa-user fa-2x"></i>
                            </button>
                        </div>
                        <div className="top_right_button">
                            <Link className="text-decoration-none text-white"  to="/CartPage" style={{cursor:"pointer"}}>
                                <i className="fa-solid fa-cart-shopping fa-2x"></i>
                            </Link>
                            '</div>
                    </div>
                </div>
                <div id="isshow">
                    {isProfilePopupOpen ? (
                        <div className="popup" id="regpopup" ref={popupRef}>
                            {isLoggedin ? <Logout/> : (
                                <div id="regpopup">
                                    <div style={{color: "black", marginTop: "1em"}}>Already Registered?</div>
                                    <Link onClick={toggleProfilePopup} to="/Login"
                                          className="login-button text-decoration-none"
                                          style={{color: "white"}}>Login</Link>

                                    <div style={{color: "black", marginTop: "1em"}}>New User?</div>
                                    <Link to="/Register"
                                          onClick={toggleProfilePopup}
                                          className="register-button text-decoration-none"
                                          style={{color: "black"}}>Register</Link>

                                </div>)}
                        </div>
                    ) : null}

                </div>
            </div>
        </nav>
    );
};

export default NavBar;
