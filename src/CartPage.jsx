// Cart.js
import React from 'react';

const Cart = ({ cartItems, totalPrice }) => {
  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div>
              <p>{item.title}</p>
              <p>Price: {item.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <p>Total Items: {cartItems.length}</p>
        <p>Total Price: {totalPrice}</p>
      </div>
    </div>
  );
};

export default Cart;
