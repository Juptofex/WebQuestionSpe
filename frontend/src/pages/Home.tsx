import React, { useState } from 'react';
import ExpenseItem from '../components/ExpenseItem';
import ExpenseAdd from '../components/ExpenseAdd';
import type { Expense } from '../types/Expense';

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      date: '2025-09-15',
      description: 'Grocery Shopping',
      payer: 'Alice',
      amount: 75.50
    },
    {
      id: '2',
      date: '2025-09-16',
      description: 'Gas Station',
      payer: 'Bob',
      amount: 45.25
    },
    {
      id: '3',
      date: '2025-09-17',
      description: 'Restaurant Dinner',
      payer: 'Bob',
      amount: 120.00
    },
    {
      id: '4',
      date: '2025-09-18',
      description: 'Coffee Shop',
      payer: 'Alice',
      amount: 12.75
    }
  ]);

  const handleAdd = (newExpense: Expense) => {
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
  };

  return (
    <div className="home-page">
      <h1>Expense Tracker</h1>
      <ExpenseAdd handleAdd={handleAdd} />
      <div className="expense-list">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default Home;
