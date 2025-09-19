import React from 'react';
import type { Expense } from '../types/Expense';

interface ExpenseAddProps {
  handleAdd: (expense: Expense) => void;
}

const ExpenseAdd: React.FC<ExpenseAddProps> = ({ handleAdd }) => {
  const onAdd = () => {
    // Randomly select payer between Alice and Bob
    const payers = ['Alice', 'Bob'];
    const randomPayer = payers[Math.floor(Math.random() * payers.length)];
    
    // Generate random amount between 0 and 100 with 2 decimal places
    const randomAmount = Math.round(Math.random() * 100 * 100) / 100;
    
    // Generate ID from current timestamp
    const id = Date.now().toString();
    
    // Create new expense
    const newExpense: Expense = {
      id,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      description: 'Random Expense',
      payer: randomPayer,
      amount: randomAmount
    };
    
    // Call the handleAdd function passed via props
    handleAdd(newExpense);
  };

  return (
    <div className="expense-add">
      <button onClick={onAdd} className="add-button">
        Add
      </button>
    </div>
  );
};

export default ExpenseAdd;
