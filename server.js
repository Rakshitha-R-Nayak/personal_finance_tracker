const express = require("express");
const crons= require("./cron");

const bodyParser = require("body-parser");
const { expenses, categories } = require("./data");
const { validateExpense, filterExpenses, analyzeExpenses } = require("./utils");

const app = express();
app.use(bodyParser.json());

// Add a new expense
app.post("/expenses", (req, res) => {
  const { category, amount, date, notes } = req.body;

  const validation = validateExpense({ category, amount }, categories);
  if (!validation.valid) {
    return res.status(400).json({ status: "error", data: null, error: validation.error });
  }

  const newExpense = { id: expenses.length + 1, category, amount, date, notes };
  expenses.push(newExpense);

  res.status(201).json({ status: "success", data: newExpense, error: null });
});

// Retrieve expenses with filters
app.get("/expenses", (req, res) => {
  const { category, startDate, endDate } = req.query;
  const filteredExpenses = filterExpenses(expenses, category, startDate, endDate);

  res.status(200).json({ status: "success", data: filteredExpenses, error: null });
});

// Analyze spending
app.get("/expenses/analysis", (req, res) => {
  const analysis = analyzeExpenses(expenses);
  res.status(200).json({ status: "success", data: analysis, error: null });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
