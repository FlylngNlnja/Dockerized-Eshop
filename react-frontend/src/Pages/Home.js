import React, { useEffect, useState } from "react";
import SlideshowComponent from '../component/SlideshowComponent'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Home() {
    return (
        <>

            <SlideshowComponent/>
            <div className="button-container">

                <Link className="text-light nav-item nav-link text-decoration-none text-center" to="Products/3"><button className="button">
                    <img src="Media/laptop.png" alt="Image"/>
                    <div className="text-center w-100"> PC & Laptops </div>
                </button></Link>
                <Link className="text-light nav-item nav-link text-decoration-none text-center" to="Products/1"><button className="button">
                    <img src="Media/phones.png" alt="Image"/>
                    <div className="text-center w-100"> Smartphones </div>
                </button></Link>
                <Link className="text-light nav-item nav-link text-decoration-none text-center" to="Products/2">
                    <button className="button">
                        <img src="Media/tv.png" alt="Image"/>
                        <div className="text-center w-100"> Τηλεοράσεις </div>
                    </button>
                </Link>
            </div>
        </>


    );
}

export default Home;
