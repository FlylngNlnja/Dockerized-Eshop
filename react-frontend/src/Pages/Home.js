import React, { useEffect, useState } from "react";
import SlideshowComponent from '../component/SlideshowComponent'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Home() {

    const [tooltipVisible, setTooltipVisible] = useState(false);



    const [slideIndex, setSlideIndex] = useState(0);


    useEffect(() => {
        const intervalId = setInterval(() => {
            showSlides();

        }, 3000);

        return () => clearInterval(intervalId);
    }, []);
    const [data, setData] = useState(null);



    function showSlides() {

        setSlideIndex((prevIndex) => {
            let newIndex = prevIndex + 1;
            if (newIndex > 3) {
                newIndex = 1;
            }
            return newIndex;
        });
    }

    function currentSlide(n) {
        setSlideIndex(n);
    }

    function showTooltip() {
        // Use React state to handle tooltip visibility
        setTooltipVisible(true);
    }

    function hideTooltip() {
        // Use React state to handle tooltip visibility
        setTooltipVisible(false);
    }


    return (
        <>

            <div className="button-container">

                <button className="button">

                    <img src="Media/laptop.png" alt="Image" />
                    <Link className="text-light nav-item nav-link text-decoration-none text-center w-100"  to="Products/3">PC & Laptops</Link>
                </button>
                <button className="button">
                    <img src="Media/phones.png" alt="Image" />
                    <Link className="text-light nav-item nav-link text-decoration-none text-center w-100"  to="Products/1">Smartphones</Link>
                </button>
                <button className="button">
                    <img src="Media/tv.png" alt="Image" />
                    <Link className="text-light nav-item nav-link text-decoration-none text-center w-100"  to="Products/2">Τηλεοράσεις</Link>
                </button>
            </div>

            <SlideshowComponent />

            <div className="slideshow-container">
                <div className="mySlides-second">
                    <div style={{ width: "800px", height: "300px", backgroundColor: "#f7f7f7", margin: "auto", borderRadius: "15px" }}></div>
                </div>

                <div className="mySlides-second">
                    <div style={{ width: "800px", height: "300px", backgroundColor: "#f7f7f7", margin: "auto", borderRadius: "15px" }}></div>
                </div>

                <div className="mySlides-second">
                    <div style={{ width: "800px", height: "300px", backgroundColor: "#f7f7f7", margin: "auto", borderRadius: "15px" }}></div>
                </div>
            </div>

            <div style={{marginBottom:"6em"}}>
                <div className="button-container-second">
                    <button className="button2">
                        <img src="Media/iphone15.png" alt="Image" />
                        <p>Iphone 15 Pro Max</p>
                        <p>1.430 €</p>
                    </button>
                    <button className="button2">
                        <img src="Media/iphone14.png" alt="Image" />
                        <p>Iphone 14 Pro Max</p>
                        <p>1.300 €</p>
                    </button>
                </div>
            </div>
        </>


    );
}

export default Home;
