const express = require('express');
const router = express.Router();
const { getAllExpenses, addExpense, resetExpenses } = require('../services/expenses');

// GET /expenses - Return all expenses
router.get('/expenses', (req, res) => {
  try {
    const expenses = getAllExpenses();
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

    // Create expense object
    const newExpense = {
      id,
      date,
      description,
      payer,
      amount
    };

    // Use service function to add expense
    if (addExpense(newExpense)) {
      res.status(201).json(newExpense);
    } else {
      res.status(400).json({ error: 'Failed to add expense' });
    }
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

// POST /expenses/reset - Reset expenses data to initial state
router.post('/expenses/reset', (req, res) => {
  try {
    console.log('Reset endpoint called');
    const resetData = resetExpenses();
    
    if (resetData !== null) {
      console.log('Reset successful, returning data');
      res.status(200).json({
        message: 'Expenses data successfully reset to initial state',
        data: resetData,
        count: resetData.length
      });
    } else {
      console.log('Reset failed - resetData is null');
      res.status(500).json({ error: 'Failed to reset expenses data - check server logs for details' });
    }
  } catch (error) {
    console.error('Error in reset endpoint:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Failed to reset expenses data - check server logs for details' });
  }
});

module.exports = router;
