const fs = require('fs');
const path = require('path');

// Path to the expenses JSON file
const expensesFilePath = path.join(__dirname, '../data/expenses.json');
const expensesInitFilePath = path.join(__dirname, '../data/expenses.init.json');

/**
 * Reads and parses all expenses from the JSON file
 * @returns {Array} Array of expense objects
 */
function getAllExpenses() {
  try {
    const data = fs.readFileSync(expensesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading expenses file:', error);
    // Return empty array if file doesn't exist or can't be read
    return [];
  }
}

/**
 * Appends a new expense to the JSON file
 * @param {Object} expense - The expense object to add
 * @param {string} expense.id - Unique identifier for the expense
 * @param {string} expense.date - Date of the expense
 * @param {string} expense.description - Description of the expense
 * @param {string} expense.payer - Person who paid for the expense
 * @param {number} expense.amount - Amount of the expense
 * @returns {boolean} True if successful, false otherwise
 */
function addExpense(expense) {
  try {
    // Validate expense object
    if (!expense || typeof expense !== 'object') {
      throw new Error('Invalid expense object');
    }

    const { id, date, description, payer, amount } = expense;

    // Validate required fields
    if (!id || !date || !description || !payer || amount === undefined) {
      throw new Error('Missing required fields: id, date, description, payer, amount');
    }

    // Validate amount is a number
    if (typeof amount !== 'number' || amount < 0) {
      throw new Error('Amount must be a positive number');
    }

    // Create properly formatted expense object
    const newExpense = {
      id: id.toString(),
      date,
      description,
      payer,
      amount: parseFloat(amount.toFixed(2)) // Ensure 2 decimal places
    };

    // Read current expenses
    const expenses = getAllExpenses();

    // Check if expense with this ID already exists
    if (expenses.find(exp => exp.id === newExpense.id)) {
      throw new Error('Expense with this ID already exists');
    }

    // Add new expense to the array
    expenses.push(newExpense);

    // Write updated expenses back to file
    fs.writeFileSync(expensesFilePath, JSON.stringify(expenses, null, 2));
    
    return true;
  } catch (error) {
    console.error('Error adding expense:', error);
    return false;
  }
}

/**
 * Resets the expenses data to initial state
 * @returns {Array|null} Array of reset expense objects if successful, null if failed
 */
function resetExpenses() {
  try {
    console.log('Starting reset operation...');
    console.log('Init file path:', expensesInitFilePath);
    console.log('Expenses file path:', expensesFilePath);
    
    // Check if init file exists
    if (!fs.existsSync(expensesInitFilePath)) {
      throw new Error(`Initial expenses file not found: ${expensesInitFilePath}`);
    }

    // Read the initial expenses data
    const initData = fs.readFileSync(expensesInitFilePath, 'utf8');
    console.log('Initial data read successfully:', initData.substring(0, 100) + '...');
    
    const initialExpenses = JSON.parse(initData);
    console.log('Initial expenses parsed:', initialExpenses.length, 'items');

    // Overwrite the current expenses file with initial data
    fs.writeFileSync(expensesFilePath, JSON.stringify(initialExpenses, null, 2));
    console.log('Expenses file written successfully');
    
    console.log('Expenses data successfully reset to initial state');
    return initialExpenses;
  } catch (error) {
    console.error('Error resetting expenses data:', error.message);
    console.error('Error stack:', error.stack);
    return null;
  }
}

module.exports = {
  getAllExpenses,
  addExpense,
  resetExpenses
};