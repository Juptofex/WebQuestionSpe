import React from 'react';
import ExpenseItem from '../components/ExpenseItem';
import type { Expense } from '../types/Expense';

const Home: React.FC = () => {
  const expenses: Expense[] = [
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
      payer: 'Charlie',
      amount: 120.00
    },
    {
      id: '4',
      date: '2025-09-18',
      description: 'Coffee Shop',
      payer: 'Alice',
      amount: 12.75
    }
  ];

  return (
    <div className="home-page">
      <h1>Expense Tracker</h1>
      <div className="expense-list">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default Home;
