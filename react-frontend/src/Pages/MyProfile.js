import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
function MyProfile() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [productsInfo, setProductsInfo] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to track the selected order
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch("http://localhost:8080/orders", {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrderData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order data:", error);
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [token]);

  const calculateTotalPrice = (order) => {
    let totalPrice = 0;
    let totalProducts = 0;

    order.quantities.forEach(quantity => {
      totalProducts += quantity.quantity;
      totalPrice += quantity.quantity * quantity.productId.price;
    });

    return { totalPrice, totalProducts };
  };

  const handleViewAllProducts = (order) => {
    const allProductsInfo = [];
    order.quantities.forEach(quantity => {
      const productInfo = {
        name: quantity.productId.name,
        quantity: quantity.quantity,
        price: quantity.productId.price
      };
      allProductsInfo.push(productInfo);
    });
    setProductsInfo(allProductsInfo);
    setSelectedOrder(order);
    setPopupVisible(true);
  };

  const columns = [
    {
      name: 'Order ID',
      selector: row => <strong>{row.id}</strong>,
    },
    {
      name: 'Total Products',
      selector: row => <strong>{calculateTotalPrice(row).totalProducts}</strong>,
    },
    {
      name: 'Total Price',
      selector: row => <strong>{calculateTotalPrice(row).totalPrice + " $"}</strong>,
    },
  ];
  const columnsNested = [
        {
          name: 'Product',
          selector: row => row.productId.name,
        },
      {
          name: 'Product price',
          selector: row => row.productId.price + " $",
      },
      {
          name: 'Quantity',
          selector: row => row.quantity,
      }
  ];
    const ExpanableComponent = ({data}) =>{
        console.log(data.quantities);
        return(
        <DataTable
            columns={columnsNested}
            data={data.quantities}
        />
    );}
  return (
      <DataTable
          title="Orders"
          columns={columns}
          data={orderData}
          pagination={true}
          fixedHeader={true}
          striped={true}
          highlightOnHover={true}
          expandableRows
          expandableRowsComponent={ExpanableComponent}
      />
  );
      // <div className="layout-wrapper layout-content-navbar">
      //   <div className="layout-container">
      //     <div className="layout-page">
      //       <div className="content-wrapper">
      //         <div className="container-xxl flex-grow-1 container-p-y">
      //           <div className="row">
      //             <div className="col-md-12">
      //               <div className="card mb-4">
      //                 <div className="card-body"></div>
      //                 <hr className="my-0"/>
      //                 <div className="card-body">
      //                   <div className="card">
      //                     <div className="table-responsive text-nowrap">
      //                       <div className="row">
      //                         <div className="col-sm text-center">Αρ. παραγγελίας</div>
      //                         <div className="col-sm text-center">Αριθμός προϊόντων</div>
      //                         <div className="col-sm text-center">Σύνολο</div>
      //                         <div className="col-sm text-center">View all Products</div>
      //                       </div>
      //                       {orderData.length === 0 ? (
      //                           <div style={{
      //                             width: "100%",
      //                             fontSize: "50px",
      //                             textAlign: "center",
      //                             verticalAlign: "middle"
      //                           }}>No orders available</div>
      //                       ) : (
      //
      //                           orderData.map((order, index) => (
      //
      //                               <>
      //                                 <div key={index} className="row mt-3">
      //                                   <div className="col-sm text-center"><strong>{order.id}</strong></div>
      //                                   <div className="col-sm text-center"><strong>{calculateTotalPrice(order).totalProducts}$</strong>
      //                                   </div>
      //                                   <div className="col-sm text-center"><strong>{calculateTotalPrice(order).totalPrice}$</strong></div>
      //                                   <div className="col-sm text-center">
      //                                     <button className="btn btn-secondary btn-success" type="button"
      //                                             onClick={() => handleViewAllProducts(order)}>
      //                                             View
      //                                       </button>
      //                                   </div>
      //                                 </div>
                                      {/*<tr>*/}
                                      {/*  <td>*/}
                                      {/*    <i className="fab fa-bootstrap fa-lg text-primary me-3"></i>{" "}*/}
                                      {/*    <strong>{order.id}</strong>*/}
                                      {/*  </td>*/}
                                      {/*  <td>{calculateTotalPrice(order).totalProducts}</td>*/}
                                      {/*  <td>{calculateTotalPrice(order).totalPrice}$</td>*/}
                                      {/*  <td>*/}
                                      {/*    <button className="btn btn-secondary" type="button"*/}
                                      {/*            onClick={() => handleViewAllProducts(order)}>*/}
                                      {/*      View all Products*/}
                                      {/*    </button>*/}
                                      {/*  </td>*/}
                                      {/*</tr>*/}


                                      {/* Check if the current order is selected and show the corresponding popup */}
      {/*                                {selectedOrder && selectedOrder.id === order.id && popupVisible && (*/}
      {/*                                    <div className="popup-container">*/}
      {/*                                      <div className="popup2"*/}
      {/*                                           style={{padding: '20px'}}> /!* Add inline style for padding *!/*/}
      {/*                                        <h2>All Products</h2>*/}
      {/*                                        <table>*/}
      {/*                                          <thead>*/}
      {/*                                          <tr>*/}
      {/*                                            <th>Name</th>*/}
      {/*                                            <th>Quantity</th>*/}
      {/*                                            <th>Price</th>*/}
      {/*                                          </tr>*/}
      {/*                                          </thead>*/}
      {/*                                          <tbody>*/}
      {/*                                          {productsInfo.map((product, index) => (*/}
      {/*                                              <tr key={index}>*/}
      {/*                                                <td>{product.name}</td>*/}
      {/*                                                <td style={{paddingRight: '20px'}}>{product.quantity}</td>*/}
      {/*                                                /!* Adjust the spacing between quantity and price *!/*/}
      {/*                                                <td>{product.price}$</td>*/}
      {/*                                              </tr>*/}
      {/*                                          ))}*/}
      {/*                                          </tbody>*/}
      {/*                                        </table>*/}
      {/*                                        <button className="btn btn-danger"*/}
      {/*                                                onClick={() => setPopupVisible(false)}>Close*/}
      {/*                                        </button>*/}
      {/*                                      </div>*/}
      {/*                                    </div>*/}
      {/*                                )}*/}
      {/*                              </>*/}
      {/*                          ))*/}
      {/*                      )}*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="content-backdrop fade"></div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="layout-overlay layout-menu-toggle"></div>*/}
      {/*</div>*/}
  // );
}

export default MyProfile;
