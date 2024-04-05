import React, { useState } from 'react';
import { Col, Form, InputGroup, Row, Button } from 'react-bootstrap';
import $ from "jquery";
import {useNavigate} from "react-router-dom";
const Admin_Add_Product = () => {
    const [formData, setFormData] = useState({
        name: '',
        longDesc: '',
        price: '',
        category_id: '',
        brandName: '',
        photo: ''
    });
    const [regAlert, setRegAlert] = useState('');
    const [sucAlert, setSucAlert] = useState('');
    const navigate = useNavigate();
    const handleChange = (field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    $(document).ready(function() {
        $("#RegAlert").hide();
        $("#SucAlert").hide();
    });
    const popalert = (toprint) => {
        setRegAlert(toprint);
        setTimeout(() => {
            setRegAlert('');
        }, 5000);
    };
    const SucAlert = (toprint) => {
        setSucAlert(toprint);
        setTimeout(() => {
            setSucAlert('');
        }, 5000);
    };
    function validationcheck(){
        if(formData.name.length < 1){popalert("The name is empty"); return false;}
        if(formData.longDesc.length <1){popalert("The desc is empty"); return false;}
        if(formData.price.length < 1){popalert("The price is empty"); return false;}
        if(formData.category_id.length < 1){popalert("The category is empty"); return false;}
        if(parseInt(formData.category_id) > 3 ){popalert("The category does not exist"); return false;}
        if(formData.brandName.length < 1){popalert("The Brand empty."); return false;}
        if(formData.photo.length < 1){popalert("The photo is empty"); return false;}
        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Assuming you have an API endpoint to handle the form data.
        if (!validationcheck()){return;}
        const apiUrl = 'http://localhost:8080/Products';
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({
                    name: '',
                    longDesc: '',
                    price: '',
                    category_id: '',
                    brandName: '',
                    photo: ''
                });
                SucAlert("Product added successfully!");
                e.target.reset();
            } else {
                popalert("There was an error. Please wait or contact developer;");
                console.error('Failed to submit form');
            }
        } catch (error) {
            popalert("There was an error. Please wait or contact developer");
            console.error('Error submitting form:', error);
        }
    };
    return (
        <div id="registerform">
            <div className="card mb-4">
                <div className="card-body">
                    <h3 className= "text-center font-weight-bold">ADD PRODUCT</h3>
                </div>
                <hr className="my-0" />
                <div className="card-body">
                    {regAlert && <div className='alert alert-danger' role='alert'>{regAlert}</div>}
                    {sucAlert && <div className='alert alert-success' role='alert'>{sucAlert}</div>}
                    <div className="row">
                        <div className="mb-3 col-md-12">
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-6" controlId="name">
                                            <Form.Label>Product Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Variable product"
                                                onChange={(e) => handleChange('name', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-6" controlId="longDesc">
                                            <Form.Label>Long description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder=""
                                                onChange={(e) => handleChange('longDesc', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="price">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="0$"
                                                onChange={(e) => handleChange('price', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-6" controlId="category_id">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Category ID"
                                                onChange={(e) => handleChange('category_id', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="brandName">
                                            <Form.Label>Brand</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="iPhone"
                                                onChange={(e) => handleChange('brandName', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="photo">
                                            <Form.Label>Photo URL</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Photo URL"
                                                onChange={(e) => handleChange('photo', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <div className="d-grid gap-2">
                                        <Button variant="primary" type="submit" className="btn btn-outline-info mb-6">
                                            SUBMIT
                                        </Button>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Admin_Add_Product;
