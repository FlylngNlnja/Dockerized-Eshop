import React, { useState, useEffect } from 'react';
import './SlideshowComponent.css';
import {forEach} from "react-bootstrap/ElementChildren";

const SlideshowComponent = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    let slides = {
        0 : {["head"] : "HP 250 G8 15.6\" FHD (i3-1005G1/8GB/256GB SSD/W10 Home) Silver (GR Keyboard)"
            , ["img"] : "Media/HP.png"
            ,["description"] : "Το HP 255 G8 απευθύνεται σε φοιτητές που θα χρειαστούν ένα οικονομικό Laptop για τις εργασίες τους, σε μαθητές και καθηγητές για τηλεκπαίδευση καθώς διαθέτει ποιοτικό μικρόφωνο, ηχεία και κάμερα, σε μαθητευόμενους προγραμματιστές καθώς και σε ανθρώπους όλων των ηλικιών που επιθυμούν ένα αξιόπιστο και πρακτικό Laptop για την καθημερινότητα τους."
            , ["price"] : "609,00 €"},
        1 : {["head"] : "Lenovo IdeaPad 1 15AMN7 15.6\" IPS FHD (Ryzen 5-7520U/8GB/256GB SSD/Radeon 610M/W11 S) Cloud Grey (GR Keyboard)"
            , ["img"] : "Media/LENOVO.png"
            ,["description"] : " Το Lenovo IdeaPad 1 15AMN7 απευθύνεται σε αυτούς που αναζητούν ένα οικονομικό φορητό υπολογιστή με ικανοποιητικά χαρακτηριστικά για εργασίες γραφείου, web browsing και multimedia αναπαραγωγή. Είναι κατάλληλο για φοιτητές, μαθητές και γενικά για καθημερινή χρήση σε σπίτι και γραφείο."
            , ["price"] : "469,00 €"},
        2 : {["head"] : "Asus Expertbook B1 B1500CBA-GR31C0X 15.6\" FHD (i3-1215U/8GB/512GB SSD/W11 Pro) Star Black (GR Keyboard)"
            , ["img"] : "Media/ASUS.png"
            ,["description"] : "Το ASUS ExpertBook B1 είναι προσαρμοσμένο για εργασία, καθιστώντας το έξυπνη επιλογή για φιλόδοξες νεοσύστατες επιχειρήσεις, καθιερωμένους εκπαιδευτικούς οργανισμούς και αναπτυσσόμενες επιχειρήσεις όλων των μεγεθών."
            , ["price"] : "635,40 €"}
    }
    useEffect(() => {

        const slideshowInterval = setInterval(showSlides, 5000);
        return () => clearInterval(slideshowInterval);
    }, [slideIndex]);

    const showSlides = () => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % Object.keys(slides).length);
    };
    const showTooltip = () => {
        document.getElementById("tooltip").style.display = "block";
    };

    const hideTooltip = () => {
        document.getElementById("tooltip").style.display = "none";
    };

    return (
        <div className="slideshow-container">
            <div className="mySlides">
                <p>{slides[slideIndex]["head"]}</p>
                <img src={slides[slideIndex]["img"]} alt="Image"/>
                <p>{slides[slideIndex]["description"]}</p>
                <p>{slides[slideIndex]["price"]}</p>
            </div>

            <div style={{textAlign: 'center'}}>
                {Object.keys(slides).map((index) => (
                    <span
                        className={`dot ${parseInt(index) === slideIndex ? 'active' : ''}`}
                        key={index}
                        onClick={() => setSlideIndex(parseInt(index))}
                    ></span>
                ))}
            </div>


        </div>


    );
};

export default SlideshowComponent;
