import React, { useEffect } from 'react';

const getEmoji = (itemName) => {
  const lowerCaseItem = itemName.toLowerCase();
  if (lowerCaseItem.includes('cat')) {
    return '🐱';
  } else if (['pet', 'dog'].some(keyword => lowerCaseItem.includes(keyword))) {
    return '🐶';
  } else if (['coffee', 'starbucks'].some(keyword => lowerCaseItem.includes(keyword))) {
    return '☕';
  } else if (['house', 'repair', 'contractor'].some(keyword => lowerCaseItem.includes(keyword))) {
    return '🛠️';
  } else if (['commute', 'uber', 'taxi'].some(keyword => lowerCaseItem.includes(keyword))) {
    return '🚕';
  } else if (['nike', 'shirt', 'tshirt', 'clothes', 'kapur', 'shoes'].some(keyword => lowerCaseItem.includes(keyword))) {
    return '👕';
  } else if (['food', 'restaurant', 'pizza'].some(keyword => lowerCaseItem.includes(keyword))) {
    return '🍔';
  } else if (['transport', 'bus', 'train'].some(keyword => lowerCaseItem.includes(keyword))) {
    return '🚌';
  } else if (['groceries', 'supermarket'].some(keyword => lowerCaseItem.includes(keyword))) {
    return '🛒';
  } else if (['entertainment', 'movie', 'game'].some(keyword => lowerCaseItem.includes(keyword))) {
    return '🎬';
  } else {
    return '✅'; // Default emoji
  }
};

const CartTracking = ({ budget, setTotalSpending, item, price, setItem, setPrice, cart, setCart }) => {
  const currentTotalSpending = cart.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    localStorage.setItem('groceeCart', JSON.stringify(cart));
    setTotalSpending(currentTotalSpending);
  }, [cart, currentTotalSpending, setTotalSpending]);

  // handleAddItem is now in App.jsx and passed via the central '+' button


  const handleDeleteItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleEditItem = (id, field, newValue) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, [field]: parseFloat(newValue) || newValue } : item
    ));
  };

  return (
    <div className="card cart-tracking-card">


      {cart.length === 0 ? (
        <p className="text-center subtle-text-color">Your cart is empty. Start adding items!</p>
      ) : (
        <ul className="cart-list">
          {cart.map((cartItem) => (
            <li key={cartItem.id} className="cart-item">
              <div className="item-icon">{getEmoji(cartItem.item)}</div>
              <div className="item-details">
                <span className="item-name">{cartItem.item}</span>
              </div>
              <span className="item-price">-₹{cartItem.price}</span>
              <button onClick={() => handleDeleteItem(cartItem.id)} className="delete-button">X</button>
            </li>
          ))}
        </ul>
      )}


    </div>
  );
};

export default CartTracking;