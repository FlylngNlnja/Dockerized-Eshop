import React, { useEffect, useState } from "react";
import './Admin.css';
import Admin_Add_User from "../component/Admin_Add_User";
import $ from "jquery";
import Admin_Add_Product from "../component/Admin_Add_Product";
import Admin_Remove_Product from "../component/Admin_Remove_Product";
import Admin_Remove_User from "../component/Admin_Remove_User";
import { useNavigate } from "react-router-dom";

function Admin() {
    const [showFields, setShowFields] = useState({
        add_user: true,
        remove_user: false,
        add_product: false,
        remove_product: false
    });
    const [adminContent, setAdminContent] = useState(null);

    const toggleField = (field) => {
        setShowFields((prev) => ({
            ...Object.keys(prev).reduce((acc, key) => {
                acc[key] = key === field;
                return acc;
            }, {})
        }));
    };

    const navigate = useNavigate();

    useEffect(() => {
        const GetAdminStatus = async () => {
            const apiUrl = 'http://localhost:8080/admin';
            if (!sessionStorage.getItem('token')) { return_error_403(); return; }
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                });

                if (response.ok) {
                    let isAdmin = await response.text();
                    if (isAdmin === "false") {
                         return_error_403(); return;
                    } else {
                        setAdminContent(
                            <>
                                <div className="sticky_top"
                                     style={{
                                         background: "black",
                                         position: "sticky",
                                         top: "8em",
                                         display: "flex",
                                         height: "5vh",
                                         width: "100%",
                                         zIndex: "1"
                                     }}>
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "auto auto auto auto",
                                        gridTemplateRows: "auto",
                                        width: "100%",
                                        zIndex: "1"
                                    }}>
                                        <button onClick={() => toggleField("add_user")}>Add user</button>
                                        <button onClick={() => toggleField("remove_user")}>Remove User</button>
                                        <button onClick={() => toggleField("add_product")}>Add Product</button>
                                        <button onClick={() => toggleField("remove_product")}>Remove Product</button>

                                    </div>
                                </div>
                                <div style={{
                                    width: "100vw",
                                    display: "flex",
                                    flexDirection: "column",

                                }}>
                                    {showFields.add_user && <Admin_Add_User />}
                                    {showFields.add_product && <Admin_Add_Product />}
                                    {showFields.remove_product && <Admin_Remove_Product />}
                                    {showFields.remove_user && <Admin_Remove_User />}
                                </div>

                            </>
                        );
                    }
                } else {
                    console.log("There was an error, please contact developer")
                    navigate('/');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        };
        GetAdminStatus();
    }, [showFields, navigate]);

    $(document).ready(function () {
        $("#LoginAlert").hide();
    });

    function return_error_403() {
        setAdminContent(<div style={{ height: "100%", width: "100%", color: "black", fontSize:"25vw",textAlign:"center",fontFamily:"sans-serif"}}>403</div>);
    }

    return adminContent;
}

export default Admin;
