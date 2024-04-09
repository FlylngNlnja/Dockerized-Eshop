import React, { useState, useEffect } from 'react';
import {Link, useLocation, useParams} from 'react-router-dom';

const OrderSuccess = () => {
    return (<>
        <div style={{
            height: "100%",
            width: "100%",
            color: "black",
            fontSize: "5em",
            textAlign: "center",
            fontFamily: "sans-serif",
            marginTop: "5%"
        }}>THANK YOU FOR YOUR ORDER</div>
            <i className="text-center w-100 fa-solid fa-check fa-10x" style={{padding: "5%", color: "#39977E"}}></i>
        </>
    );
};

export default OrderSuccess;

