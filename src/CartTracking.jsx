import React, { useEffect } from 'react';

const getEmoji = (itemName) => {
  const lowerCaseItem = itemName.toLowerCase();
  if (lowerCaseItem.includes('pet') || lowerCaseItem.includes('dog') || lowerCaseItem.includes('cat')) {
    return '🐶';
  } else if (lowerCaseItem.includes('coffee') || lowerCaseItem.includes('starbucks')) {
    return '☕';
  } else if (lowerCaseItem.includes('house') || lowerCaseItem.includes('repair') || lowerCaseItem.includes('contractor')) {
    return '🛠️';
  } else if (lowerCaseItem.includes('commute') || lowerCaseItem.includes('uber') || lowerCaseItem.includes('taxi')) {
    return '🚕';
  } else if (lowerCaseItem.includes('nike') || lowerCaseItem.includes('clothing') || lowerCaseItem.includes('shirt') || lowerCaseItem.includes('shoes')) {
    return '👕';
  } else if (lowerCaseItem.includes('food') || lowerCaseItem.includes('restaurant') || lowerCaseItem.includes('pizza')) {
    return '🍔';
  } else if (lowerCaseItem.includes('transport') || lowerCaseItem.includes('bus') || lowerCaseItem.includes('train')) {
    return '🚌';
  } else if (lowerCaseItem.includes('groceries') || lowerCaseItem.includes('supermarket')) {
    return '🛒';
  } else if (lowerCaseItem.includes('entertainment') || lowerCaseItem.includes('movie') || lowerCaseItem.includes('game')) {
    return '🎬';
  } else {
    return '💸'; // Default emoji
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
            </li>
          ))}
        </ul>
      )}


    </div>
  );
};

export default CartTracking;