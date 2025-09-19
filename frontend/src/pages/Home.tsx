import React, { useState, useEffect } from 'react';
import ExpenseItem from '../components/ExpenseItem';
import ExpenseAdd from '../components/ExpenseAdd';
import ExpenseSorter, { type SortOption } from '../components/ExpenseSorter';
import { sortExpenses } from '../utils/sortUtils';
import type { Expense } from '../types/Expense';

const API_BASE_URL = 'http://localhost:3000/api';

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('date-newest');

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

  const handleReset = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Calling reset endpoint...');
      const response = await fetch(`${API_BASE_URL}/expenses/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Reset response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Reset failed with error:', errorData);
        throw new Error(errorData.error || `Reset failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log('Reset successful:', result);
      setExpenses(result.data);
      setError(null);
      
      // Show success message briefly
      const successMessage = `Data successfully reset! ${result.count} expenses loaded.`;
      setError(successMessage);
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      console.error('Error resetting expenses:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to reset expenses: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Sort expenses based on current sort option
  const sortedExpenses = sortExpenses(expenses, sortOption);

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
  };

  return (
    <div className="home-page">
      <h1>Expense Tracker</h1>
      {error && <div className={error.includes('successfully') ? 'success-message' : 'error-message'}>{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="controls-section">
        <ExpenseAdd handleAdd={handleAdd} />
        <button onClick={handleReset} className="reset-button" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Data'}
        </button>
      </div>
      {!loading && expenses.length > 0 && (
        <ExpenseSorter currentSort={sortOption} onSortChange={handleSortChange} />
      )}
      {loading ? (
        <div className="loading">Loading expenses...</div>
      ) : (
        <div className="expense-list">
          {expenses.length === 0 ? (
            <div className="no-expenses">No expenses found. Add your first expense!</div>
          ) : (
            sortedExpenses.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
