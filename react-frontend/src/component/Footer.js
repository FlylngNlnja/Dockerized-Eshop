import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {

    return (
       <>
           <div className="Footer">
               <div className="Credits">
                   Developed by <br/>
                   <a className="text-decoration-none" href="https://github.com/FlylngNlnja" target="_blank"
                      rel="noreferrer"> Christos S.</a> <i className="fa-solid fa-plus"></i>
                   <a className="text-decoration-none" href="https://github.com/Gsotis" target="_blank"
                      rel="noreferrer"> Gsotis</a> <i className="fa-solid fa-plus"></i>
                   <a className="text-decoration-none" href="https://github.com/ChrisMi1" target="_blank"
                      rel="noreferrer"> Christos M.</a>
               </div>
               <div className="Frameworks">
                   <i className="fa-solid fa-power-off fa-4x" style={{color: "#000000"}}></i>
                   <i className="fa-brands fa-react fa-4x" style={{color: "#3ab7ff"}}></i>
                   <i className="fa-brands fa-js fa-4x" style={{color: "#eeca13"}}></i>
                   <i className="fa-brands fa-github fa-4x" style={{color: "#000000"}}></i>
               </div>
           </div>

       </>
    );
};

export default Footer;
