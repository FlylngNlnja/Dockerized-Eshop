import React, { useEffect, useState, useRef } from 'react';
import './CartPage.css';
import {useNavigate} from "react-router-dom";
import {Button, Col, Form, Row} from "react-bootstrap";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const storedItemsRef = useRef([]);
    const [totalCost, setTotalCost] = useState(0);
    const [formData, setFormData] = useState({
        "cardNumber": "",
        "holderName": "",
        "expireDate": ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const items = JSON.parse(sessionStorage.getItem('Cart')) || [];
        storedItemsRef.current = items; // Update the ref value
        GetTableData();

        // Check for token existence and redirect if needed
        if (!sessionStorage.getItem('token')) {
            navigate('/Login');
        }
    }, [navigate]);

    const handleChange = (field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };
    const send_order = async (e) => {

        e.preventDefault();
        if(formData["cardNumber"].length!==16){return;}
        if(formData["holderName"]===""){return;}
        if(formData["expireDate"]===""){return;}
        if (storedItemsRef.current.length === 0) {
            return;
        }
        const apiUrl = 'http://localhost:8080/orders';
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    ...formData,
                    "productQuantities": storedItemsRef.current
                }),
            });

            if (response.ok) {
                sessionStorage.removeItem('Cart');
                storedItemsRef.current = [];
                setCartItems([]);
                setTotalCost(0);
                navigate("/OrderSuccess");
            }
        } catch (error) {
            console.error('Error sending order:', error);
        }
    }
    const GetTableData = async () => {
        if (storedItemsRef.current.length === 0) {
            return;
        }
        const apiUrl = 'http://localhost:8080/cart';
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify(Object.keys(storedItemsRef.current)),
            });

            if (response.ok) {
                const data = await response.json();
                setCartItems(data);
                setTotalCost(data.reduce((acc, item) => acc + item.price * storedItemsRef.current[item.id], 0));
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };


    const removeItem = (itemId) => {
        let cart = JSON.parse(sessionStorage.getItem('Cart')) || {};
        if (cart.hasOwnProperty(itemId)) {
            if(cart[itemId]>1){
                cart[itemId]--;
            }else{
                delete cart[itemId];
            }
            storedItemsRef.current = cart;
            sessionStorage.setItem('Cart', JSON.stringify(cart));
            GetTableData();
        }
    };

    return (<div className="cart-container">
        <h1 className="cart-title">Καλάθι Αγορών</h1>
        <ul className="cart-items">
            {cartItems.map(item => (
                <li key={item.id} className="cart-item">
                    <div className="item-details">
                        <img src={item.photo} alt={item.name} className="item-photo"/>
                        <div>
                            <p className="item-name">{item.name}</p>
                            <p className="item-price">{item.price}€</p>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button className="delete-button" onClick={() => removeItem(item.id)}>
                            <img src="Media/delete.png" alt="Διαγραφή" className="delete-icon"/>
                        </button>
                        <div className="input-container">
                            <div> {storedItemsRef.current[item.id]} </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>

        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
            <div className="cart-total">
                Συνολικό Κόστος: {totalCost}€
            </div>
            <Form onSubmit={send_order}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="cardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                style={{width: "100%"}}
                                type="number"
                                placeholder="5323 **** **** 5342"
                                onChange={(e) => handleChange('cardNumber', e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="holderName">
                            <Form.Label>Holder name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="John doe"
                                onChange={(e) => handleChange('holderName', e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="expireDate">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="12/5/2027"
                                onChange={(e) => handleChange('expireDate', e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" className="btn btn-outline-info mb-6">
                            ΟΛΟΚΛΗΡΩΣΗ ΠΑΡΑΓΓΕΛΙΑΣ
                        </Button>
                    </div>
                </Row>
            </Form>
        </div>
    </div> )
};

export default CartPage;
