// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

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
  };

  const showProducts = (category) => {
    if (category.toLowerCase() === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(cat => cat.category_name.toLowerCase() === category.toLowerCase());
      setFilteredProducts(filtered);
    }
  };

  const searchProducts = (brand) => {
    const filtered = products.filter(categoryData => {
      return categoryData.category_name.toLowerCase().includes(brand.toLowerCase()) ||
        categoryData.category_products.some(product => product.vendor.toLowerCase().includes(brand.toLowerCase()));
    });
    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    setTotalItems(totalItems + 1);
    setShowPopup(true);
    setPopupMessage('Item added to cart');
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
    setTotalItems(totalItems - 1);
    setShowPopup(true);
    setPopupMessage('Item removed from cart');
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className='container-fluid Mainn'>
      <div className="eve">

        <h1>Our Products</h1>
        <div className="fl">
          <div className="buttons">
            <button className=' button-1' onClick={() => showProducts('All')}>All</button>
            <button className=' button-1' onClick={() => showProducts('Men')}>Mens</button>
            <button className=' button-1' onClick={() => showProducts('Women')}>Womens</button>
            <button className=' button-1' onClick={() => showProducts('Kids')}>Kids</button>
          </div>
          {/* Search form */}
          <div className="search-container">
            <input type="text" id="search-input" placeholder="Search by brand or category" onChange={(e) => searchProducts(e.target.value)} />
          </div>
        </div>
        <div className="products-container">
          {filteredProducts.map(categoryData => {
            return categoryData.category_products.map(product => (
              <div className="minn" key={product.id}>
                <div className="productContainer">
                  <div className="product">
                    <img src={product.image} alt={product.title} />
                    <h4>{product.title}</h4>
                    <p>Price: {product.price}</p>
                    <p>Vendor: {product.vendor}</p>
                    {product.badge_text && <span className="badge">{product.badge_text}</span>}
                    <br />
                    <button className="add-to-cart-button" onClick={() => addToCart(product)}>+</button>
                  </div>
                </div>
              </div>
            ));
          })}
        </div>
      </div>
      <div className="container-fluid shadow-lg p-3 mb-5 bg-body-tertiary rounded">

        <div className="cart-container">
          <p>Cart Items: {totalItems}</p>
        </div>
        {showPopup && <div className="popup">{popupMessage}</div>}
        {cartItems.length > 0 &&
          <div className="cart-items">
            <h2>Cart</h2>
            {cartItems.map(item => (
              <div key={item.id}>
                <p>{item.title}</p>
                <button className="re-to-cart-button" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
