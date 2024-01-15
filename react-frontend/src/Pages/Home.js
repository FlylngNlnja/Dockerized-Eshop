import React, { useEffect, useState } from "react";
import SlideshowComponent from '../component/SlideshowComponent'
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
        <div>

            <div className="button-container">
                <button className="button">
                    <img src="Media/laptop.png" alt="Image" />
                    PC & Laptops
                </button>
                <button className="button">
                    <img src="Media/phones.png" alt="Image" />
                    Smartphones
                </button>
                <button className="button">
                    <img src="Media/tv.png" alt="Image" />
                    Τηλεοράσεις
                </button>
            </div>

<SlideshowComponent />

            <div className="slideshow-container-second">
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

        </div>


    );
}

export default Home;
