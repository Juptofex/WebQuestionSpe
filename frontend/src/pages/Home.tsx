import React, { useState, useEffect } from 'react';
import ExpenseItem from '../components/ExpenseItem';
import ExpenseAdd from '../components/ExpenseAdd';
import type { Expense } from '../types/Expense';

const API_BASE_URL = 'http://localhost:3000/api';

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch expenses from backend on component mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/expenses`);
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      setExpenses(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setError('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newExpense: Expense) => {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      const addedExpense = await response.json();
      setExpenses(prevExpenses => [...prevExpenses, addedExpense]);
    } catch (err) {
      console.error('Error adding expense:', err);
      setError('Failed to add expense');
    }
  };

  return (
    <div className="home-page">
      <h1>Expense Tracker</h1>
      {error && <div className="error-message">{error}</div>}
      <ExpenseAdd handleAdd={handleAdd} />
      {loading ? (
        <div className="loading">Loading expenses...</div>
      ) : (
        <div className="expense-list">
          {expenses.length === 0 ? (
            <div className="no-expenses">No expenses found. Add your first expense!</div>
          ) : (
            expenses.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
