import React, {useEffect, useState} from 'react';
import { Col, Form, InputGroup, Row, Button } from 'react-bootstrap';
import $ from "jquery";
import {useNavigate} from "react-router-dom";
import DataTable from 'react-data-table-component';


const Admin_Remove_User = () => {
    const [pending, setPending] = React.useState(true);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [result, setResult] = useState(['']);
    let colors = {
        "Pending": "warning",
        "Cancelled": "danger",
        "Complete": "success"
    }
    useEffect(() => {
        RetrieveData();
    }, []);
    useEffect(() => {
        setResult(data.filter((item) => {
            let searchLower = search.toLowerCase();
            let idMatch = String(item.id).toLowerCase().includes(searchLower);
            let usernameMatch = String(item.user.username).toLowerCase().includes(searchLower);
            let emailMatch = String(item.user.email).toLowerCase().includes(searchLower);
            let addressMatch1 = String(item.user.addresses[0].addressLine1).toLowerCase().includes(searchLower);
            let addressMatch2 = String(item.user.addresses[0].city).toLowerCase().includes(searchLower);
            let addressMatch3 = String(item.user.addresses[0].postCode).toLowerCase().includes(searchLower);
            let addressMatch4 = String(item.user.addresses[0].country).toLowerCase().includes(searchLower);
            let statusMatch = String(item.status).toLowerCase().includes(searchLower);
            return idMatch || usernameMatch || emailMatch || addressMatch1 || addressMatch2 || addressMatch3 || addressMatch4 || statusMatch;
        }));
    }, [search]);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };
    const handleCancel = async (e, id) => {
        try {
            const response = await fetch('http://localhost:8080/admin/orders?order_id='+id+"&status=Cancelled", {
                method: 'PUT',
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
    const handleComplete = async (e, id) => {
        try {
            const response = await fetch('http://localhost:8080/admin/orders?order_id='+id+"&status=Complete", {
                method: 'PUT',
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
            const response = await fetch('http://localhost:8080/admin/orders', {
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
                    return item.user.username.toLowerCase().includes(search.toLowerCase());
                }));
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },{
            name: 'User ID',
            selector: row => row.user.id,
            sortable: true,
        },{
            name: 'Username',
            selector: row => row.user.username,
            sortable: true,
        },{
            name: 'Email',
            selector: row => row.user.email,
            sortable: true,
        },{
            name: 'Address',
            selector: row => row.user.addresses[0].addressLine1 + " " + row.user.addresses[0].city + " " + row.user.addresses[0].postCode + " " + row.user.addresses[0].country,
            sortable: true,
        },{
            name: 'Status',
            selector: row => row.status,
            cell: row => <span className={`text-${colors[row.status]}`}>{row.status}</span>,
            sortable: true,
        },
        {
            name: "Actions",
            button: true,
            cell: (row) => (
                row.status === "Pending" &&
                <div style={{width: "100px"}}>
                <button
                    className="btn btn-outline btn-xs btn-danger w-100 m-1"
                    onClick={(e) => handleCancel(e, row.id)}
                >
                    Cancel
                </button>
                    <button
                        className="btn btn-outline btn-xs btn-success  w-100 m-1"
                        onClick={(e) => handleComplete(e, row.id)}
                    >
                        Complete
                    </button>
                </div>
            ),

        },

    ];

    const columnsNested = [
        {
            name: 'Product',
            selector: row => row.productId.name,
            sortable: true,

        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,
        },
        {
            name: 'Product price',
            selector: row => row.productId.price + " $",
            sortable: true,
        }
    ];

    const ExpanableComponent = ({data}) =>{
        console.log(data.quantities);
        return(
            <DataTable
                columns={columnsNested}
                data={data.quantities}
                right={true}
                theme="dark"
            />
        );}
    return (
        <DataTable
            title="Users"
            columns={columns}
            data={result}
            pagination={true}
            striped={true}
            highlightOnHover={true}
            progressPending={pending}
            actions={<input onChange={handleInputChange} className="search-input" type="text" value={search}/>}
            expandableRows
            expandableRowsComponent={ExpanableComponent}
        />);
};


export default Admin_Remove_User;
