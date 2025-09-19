import React from 'react';
import type { Expense } from '../types/Expense';

interface ExpenseItemProps {
  expense: Expense;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <div className="expense-item">
      <div className="expense-date">
        {new Date(expense.date).toLocaleDateString()}
      </div>
      <div className="expense-details">
        <h3 className="expense-description">{expense.description}</h3>
        <p className="expense-payer">Paid by: {expense.payer}</p>
      </div>
      <div className="expense-amount">
        ${expense.amount.toFixed(2)}
      </div>
    </div>
  );
};

export default ExpenseItem;
