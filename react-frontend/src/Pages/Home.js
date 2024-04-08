import React, { useEffect, useState } from "react";
import SlideshowComponent from '../component/SlideshowComponent'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Home() {
    return (
        <>

            <SlideshowComponent/>
            <div className="button-container">

                <button className="button">
                    <img src="Media/laptop.png" alt="Image"/>
                    <Link className="text-light nav-item nav-link text-decoration-none text-center w-100"
                          to="Products/3">PC & Laptops</Link>
                </button>
                <button className="button">
                    <img src="Media/phones.png" alt="Image"/>
                    <Link className="text-light nav-item nav-link text-decoration-none text-center w-100"
                          to="Products/1">Smartphones</Link>
                </button>
                <button className="button">
                    <img src="Media/tv.png" alt="Image"/>
                    <Link className="text-light nav-item nav-link text-decoration-none text-center w-100"
                          to="Products/2">Τηλεοράσεις</Link>
                </button>
            </div>
        </>


    );
}

export default Home;
