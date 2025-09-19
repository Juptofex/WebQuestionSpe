const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to the expenses JSON file
const expensesFilePath = path.join(__dirname, '../data/expenses.json');

// Helper function to read expenses from JSON file
function readExpenses() {
  try {
    const data = fs.readFileSync(expensesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading expenses file:', error);
    return [];
  }
}

// Helper function to write expenses to JSON file
function writeExpenses(expenses) {
  try {
    fs.writeFileSync(expensesFilePath, JSON.stringify(expenses, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing expenses file:', error);
    return false;
  }
}

// GET /expenses - Return all expenses
router.get('/expenses', (req, res) => {
  try {
    const expenses = readExpenses();
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// POST /expenses - Add a new expense
router.post('/expenses', (req, res) => {
  try {
    const { id, date, description, payer, amount } = req.body;

    // Validate required fields
    if (!id || !date || !description || !payer || amount === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields: id, date, description, payer, amount' 
      });
    }

    // Validate amount is a number
    if (typeof amount !== 'number' || amount < 0) {
      return res.status(400).json({ 
        error: 'Amount must be a positive number' 
      });
    }

    // Create new expense object
    const newExpense = {
      id: id.toString(),
      date,
      description,
      payer,
      amount: parseFloat(amount.toFixed(2)) // Ensure 2 decimal places
    };

    // Read current expenses
    const expenses = readExpenses();

    // Check if expense with this ID already exists
    if (expenses.find(expense => expense.id === newExpense.id)) {
      return res.status(400).json({ 
        error: 'Expense with this ID already exists' 
      });
    }

    // Add new expense to the array
    expenses.push(newExpense);

    // Write updated expenses back to file
    if (writeExpenses(expenses)) {
      res.status(201).json(newExpense);
    } else {
      res.status(500).json({ error: 'Failed to save expense' });
    }
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

module.exports = router;
