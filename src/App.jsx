import React, { useState, useEffect } from 'react';

import CartTracking from './CartTracking';
import './App.css';

function App() {
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem('budget');
    return savedBudget ? parseFloat(savedBudget) : 0;
  });
  const [totalSpending, setTotalSpending] = useState(0);
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('groceeCart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const handleAddItem = () => {
    const itemPrice = parseFloat(price);
    if (item.trim() && !isNaN(itemPrice) && itemPrice > 0) {
      setCart([...cart, { id: Date.now(), item, price: itemPrice }]);
      setItem('');
      setPrice('');
    } else {
      alert('Please enter a valid item name and price.');
    }
  };

  useEffect(() => {
    localStorage.setItem('budget', budget.toString());
  }, [budget]);

  const percentageUsed = budget > 0 ? (totalSpending / budget) * 100 : 0;

  return (
    <div className="App">
      <div className="header">
        <div>
          <p className="welcome-text">Welcome to</p>
          <h2>Grocee</h2>
        </div>
      </div>

      <div className="summary-cards">
        <div className="card total-salary-card">
          <h3>Total Salary</h3>
          <div
              className="budget-input"
            >
              <span className="currency-symbol" contentEditable="false">₹</span>
              <span
                className="budget-value"
                contentEditable="true"
                onBlur={(e) => setBudget(parseFloat(e.target.textContent))}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.target.blur();
                  }
                }}
                suppressContentEditableWarning={true}
              >
                {budget}
              </span>
            </div>

        </div>
        <div className="card total-expense-card">
          <h3>Total Expense</h3>
          <div
              className="budget-input"
            >
              <span className="currency-symbol" contentEditable="false">₹</span>
              <span
                className="budget-value"
              >
                {totalSpending.toFixed(2)}
              </span>
            </div>
        </div>
      </div>

      <div className="expenses-section">
        <div className="section-header">
          <h3>Expenses</h3>
          <span className="view-all">View All</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${percentageUsed}%` }}></div>
        </div>
        <p className="progress-text">{percentageUsed.toFixed(2)}% of budget used</p>
        <div className="flex-container mb-15">
          <input
            type="text"
            placeholder="Item Name"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleAddItem(); }}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleAddItem(); }}
          />
        </div>
        <CartTracking
          budget={budget}
          setTotalSpending={setTotalSpending}
          item={item}
          price={price}
          setItem={setItem}
          setPrice={setPrice}
          cart={cart}
          setCart={setCart}
        />
      </div>

      <div className="navigation-bar">
        <button className="add-button" onClick={handleAddItem}></button>
      </div>
    </div>
  );
}

export default App;
