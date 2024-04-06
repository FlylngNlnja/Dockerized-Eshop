import React, { useState } from 'react';
import { Col, Form, InputGroup, Row, Button } from 'react-bootstrap';
import $ from "jquery";
import {useNavigate} from "react-router-dom";



const Admin_Add_User = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_val: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthDate: '',
        country: '',
        city : '',
        addressLine : '',
        postCode : ''
    });

    const [regAlert, setRegAlert] = useState('');
    const [sucAlert, setSucAlert] = useState('');
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
        if(formData.password.length < 8){popalert("The password is too short. It needs to have more than 8 characters"); return false;}
        if(formData.password.length > 30){popalert("The password is too long. It needs to have less than 30 characters"); return false;}
        if(formData.username.length < 6){popalert("The username is too long. It needs to have more than 6 characters"); return false;}
        if(formData.username.length > 30){popalert("The userame is too large. It needs to have less than 30 characters"); return false;}
        if(formData.firstName.length < 2){popalert("The firstname is too short. It needs to have more than 2 characters"); return false;}
        if(formData.lastName.length < 2){popalert("The lastname is too short. It needs to have more than 2 characters"); return false;}
        if(formData.firstName.length > 36){popalert("The firstname is too long. It needs to have less than 36 characters"); return false;}
        if(formData.lastName.length > 36){popalert("The lastname is too long. It needs to have less than 36 characters"); return false;}
        if(formData.postCode.length !== 5){popalert("The postal code must be exactly 5 numbers"); return false;}
        if(formData.password !== formData.password_val){popalert("The passwords do not match!"); return false;}
        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Assuming you have an API endpoint to handle the form data.
        if (!validationcheck()){return;}
        const apiUrl = 'http://localhost:8080/auth/register';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                SucAlert("Successful user Creation");
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    password_val: '',
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    birthDate: '',
                    country: '',
                    city : '',
                    addressLine : '',
                    postCode : ''
                });
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
                    <h3 className= "text-center font-weight-bold">ADD USER</h3>
                </div>
                <hr className="my-0" />
                <div className="card-body">
                    <div className='alert alert-danger' role='alert' id="RegAlert"> Some of the fields you entered are
                        incorrect or empty!
                    </div>
                    {regAlert && <div className='alert alert-danger' role='alert'>{regAlert}</div>}
                    {sucAlert && <div className='alert alert-success' role='alert'>{sucAlert}</div>}
                    <div className="row">
                        <div className="mb-3 col-md-12">
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-6" controlId="firstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your First Name"
                                                onChange={(e) => handleChange('firstName', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-6" controlId="lastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your Last Name"
                                                onChange={(e) => handleChange('lastName', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="birthDate">
                                            <Form.Label>Birth Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="00-00-0000"
                                                onChange={(e) => handleChange('birthDate', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-6" controlId="username">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your username"
                                                onChange={(e) => handleChange('username', e.target.value)}
                                                aria-describedby="usernamehelp"
                                            />
                                            <Form.Text id="usernamehelp" muted>
                                                8-32 Characters.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="********"
                                                onChange={(e) => handleChange('password', e.target.value)}
                                                aria-describedby="passwordHelpBlock"
                                            />
                                            <Form.Text id="passwordHelpBlock" muted>
                                                Your password must be 6-32 characters long, contain at least one
                                                uppercase letter, a symbol and a number.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="password_val">
                                            <Form.Label>Confirm your Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="********"
                                                onChange={(e) => handleChange('password_val', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter your email"
                                                onChange={(e) => handleChange('email', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="phoneNumber">
                                            <Form.Label>Phone</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text id="inputGroupPrepend">+30</InputGroup.Text>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter your phone number"
                                                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="addressLine">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your address"
                                                onChange={(e) => handleChange('addressLine', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="postCode">
                                            <Form.Label>ZIP</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter your ZIP"
                                                onChange={(e) => handleChange('postCode', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="city">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="City"
                                                onChange={(e) => handleChange('city', e.target.value)}
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


export default Admin_Add_User;
