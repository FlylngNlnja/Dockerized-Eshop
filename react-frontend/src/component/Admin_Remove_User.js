import React, {useEffect, useState} from 'react';
import { Col, Form, InputGroup, Row, Button } from 'react-bootstrap';
import $ from "jquery";
import {useNavigate} from "react-router-dom";
import DataTable from 'react-data-table-component';


const Admin_Remove_User = () => {
    const [formData, setFormData] = useState({
        userId: ''
    });
    const [regAlert, setRegAlert] = useState('');
    const [sucAlert, setSucAlert] = useState('');
    const [pending, setPending] = React.useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [result, setResult] = useState(['']);

    useEffect(() => {
        RetrieveData();
    }, []);
    useEffect(() => {
        setResult(data.filter((item) => {
            let searchLower = search.toLowerCase();
            let idMatch = String(item.id).toLowerCase().includes(searchLower);
            let nameMatch = item.username.toLowerCase().includes(searchLower);
            let emailMatch = item.email.toLowerCase().includes(searchLower);
            let firstNameMatch = item.firstName.toLowerCase().includes(searchLower);
            let lastNameMatch = item.lastName.toLowerCase().includes(searchLower);
            let phoneNumberMatch = item.phoneNumber.toLowerCase().includes(searchLower);
            return idMatch || nameMatch || emailMatch || firstNameMatch || lastNameMatch || phoneNumberMatch;
        }));
    }, [search]);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };
    const handleButtonClick = async (e, id) => {
        try {
            const response = await fetch('http://localhost:8080/Users/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            });
            if (response.ok) {
                RetrieveData();
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    }
    const RetrieveData = async (e) => {
        try {
            const response = await fetch('http://localhost:8080/Admin/Users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            });
            if (response.ok) {
                const responseData = await response.json();
                setData(responseData);
                setPending(false);
                setResult(responseData.filter((item) => {
                    return item.username.toLowerCase().includes(search.toLowerCase());
                }));
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    }

    const columns = [
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },{
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },{
            name: 'Firstname',
            selector: row => row.firstName,
            sortable: true,
        },{
            name: 'Lastname',
            selector: row => row.lastName,
            sortable: true,
        },{
            name: 'Phone Number',
            selector: row => row.phoneNumber,
            sortable: true,
        },
        {
            name: "Actions",
            button: true,
            cell: (row) => (
                <button
                    className="btn btn-outline btn-xs btn-danger"
                    onClick={(e) => handleButtonClick(e, row.id)}
                >
                    Delete
                </button>
            ),
        },

    ];
    return (
        <DataTable
            title="Users"
            columns={columns}
            data={result}
            pagination={true}
            fixedHeader={true}
            striped={true}
            highlightOnHover={true}
            progressPending={pending}
            actions={<input onChange={handleInputChange} className="search-input" type="text" value={search}/>}
        />);
};


export default Admin_Remove_User;
