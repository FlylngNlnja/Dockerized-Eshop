import React, {useEffect, useState} from 'react';
import { Col, Form, InputGroup, Row, Button } from 'react-bootstrap';
import $ from "jquery";
import {useNavigate} from "react-router-dom";
import DataTable from "react-data-table-component";



const Admin_Remove_Product = () => {
    const [pending, setPending] = React.useState(true);
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
            let nameMatch = item.name.toLowerCase().includes(searchLower);
            let categoryMatch = item.category.categoryName.toLowerCase().includes(searchLower);
            let brandMatch = item.brandName.toLowerCase().includes(searchLower);
            return idMatch || nameMatch || categoryMatch || brandMatch;
        }));
    }, [search]);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };
    const handleButtonClick = async (e, id) => {
        try {
            const response = await fetch('http://localhost:8080/Products/'+id, {
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
            const response = await fetch('http://localhost:8080/Products', {
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
                    return item.name.toLowerCase().includes(search.toLowerCase());
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
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price + " $",
            sortable: true,
        },{
            name: 'Category',
            selector: row => row.category.categoryName,
            sortable: true,
        },
        ,{
            name: 'Brand',
            selector: row => row.brandName,
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
        <>
        <DataTable
            title="Products"
            columns={columns}
            data={result}
            pagination={true}
            striped={true}
            highlightOnHover={true}
            progressPending={pending}
            actions={<input onChange={handleInputChange} className="search-input" type="text" value={search}/>}

        />
        </>);
};


export default Admin_Remove_Product;
