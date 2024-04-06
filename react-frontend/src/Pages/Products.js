import React, { useState, useEffect } from 'react';
import {Link, useLocation, useParams} from 'react-router-dom';
import './Products.css';

const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    fetchProducts();
  },[location]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/ShopNow/' + id);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (product) => {
    let cart = JSON.parse(sessionStorage.getItem('Cart')) || {};
    if (cart.hasOwnProperty(product.id)) {
      cart[product.id]++;
    } else {
      cart[product.id] = 1;
    }
    sessionStorage.setItem('Cart', JSON.stringify(cart));
    let notification = document.createElement("div");
    notification.className = "alert";
    notification.style = " color:black;background-color: #d4edda;";
    notification.innerHTML = product.name + " added to cart";
    const notifhere = document.querySelector(".NotificationsHere")
    notifhere.insertBefore(notification, notifhere.firstChild);
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.querySelector(".NotificationsHere").removeChild(notification);
      }
    }, 3000);

  };

  return (<>
        <div>
        <div className="NotificationsHere " style={{
          height: "7vh",
          overflow: "hidden",
          margin: "10px auto",
          width: "100vw",
          position: "sticky",
          top: "95%",
          zIndex: "999"
        }}>
        </div>
        <div className="products-container">
          {products.map(product => (
              <div key={product.id} className="product-container">
                <div className="product-box">
                  <div className="b-container">
                    <img src={product.photo} alt="Product"/>
                    <div className="product-details">
                      <h3>{product.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="price-box" onClick={() => addToCart(product)}>
                  <p>{product.price}€</p>
                  <div className="add_to_cart_button">
                    <img src="/Media/Cart.png" alt="Cart Icon"/>
                  </div>
                </div>
              </div>
          ))}
        </div>
        </div>

      </>
  );
};

export default Products;

