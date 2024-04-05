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
      selector: row => row.id,
        sortable: true,
    },
    {
      name: 'Total Products',
      selector: row => calculateTotalPrice(row).totalProducts,
        sortable: true,
    },
    {
      name: 'Total Price',
      selector: row => calculateTotalPrice(row).totalPrice + " $",
        sortable: true,

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

}

export default MyProfile;
