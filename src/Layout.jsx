// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Cart from './CartPage'; // Import the Cart component

function Layout() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
      const data = response.data;
      setProducts(data.categories);
      setFilteredProducts(data.categories);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const showProducts = (category) => {
    if (category.toLowerCase() === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(cat => cat.category_name.toLowerCase() === category.toLowerCase());
      setFilteredProducts(filtered);
    }
  }

  const searchProducts = (brand) => {
    const filtered = products.filter(categoryData => {
      return categoryData.category_products.some(product => product.vendor.toLowerCase().includes(brand.toLowerCase()));
    });
    setFilteredProducts(filtered);
  }

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setTotalPrice(totalPrice + product.price);
  }

  return (
    <div>
      <h1>Our Products</h1>
      
      <div className="buttons">
        <button onClick={() => showProducts('All')}>All</button>
        <button onClick={() => showProducts('Men')}>Mens</button>
        <button onClick={() => showProducts('Women')}>Womens</button>
        <button onClick={() => showProducts('Kids')}>Kids</button>
      </div>

      <div className="search-container">
        <input type="text" id="search-input" placeholder="Search by brand" onChange={(e) => searchProducts(e.target.value)} />
      </div>

      <div className="products-container">
        {filteredProducts.map(categoryData => {
          return categoryData.category_products.map(product => (
            <div className="product" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>Price: {product.price}</p>
              <p>Vendor: {product.vendor}</p>
              {product.badge_text && <span className="badge">{product.badge_text}</span>}
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ));
        })}
      </div>
      <Cart cartItems={cartItems} totalPrice={totalPrice} /> {/* Render the Cart component */}
    </div>
  );
}

export default Layout;
