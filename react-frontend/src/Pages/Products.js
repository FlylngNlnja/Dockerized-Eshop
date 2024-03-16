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
  };

  return (
    <div className="products-container">
      {products.map(product => (
        <div key={product.id} className="product-container">
          <div className="product-box">
            <div className="b-container">
              <img src={product.photo} alt="Product" />
              <div className="product-details">
                <h3>{product.name}</h3>
              </div>
            </div>
          </div>
          <div className="price-box">
            <p>{product.price}€</p>
            <button onClick={() => addToCart(product)}>
               <img src="/Media/Cart.png" alt="Cart Icon" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;

