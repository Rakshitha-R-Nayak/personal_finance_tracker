// Validate expense data
const validateExpense = (expense, categories) => {
    const { category, amount } = expense;
  
    if (!categories.includes(category)) {
      return { valid: false, error: "Invalid category" };
    }
    if (amount <= 0) {
      return { valid: false, error: "Amount must be a positive number" };
    }
    return { valid: true };
  };
  
  // Filter expenses by category and date range
  const filterExpenses = (expenses, category, startDate, endDate) => {
    return expenses.filter(exp => {
      const matchesCategory = category ? exp.category === category : true;
      const matchesDate = startDate && endDate
        ? new Date(exp.date) >= new Date(startDate) && new Date(exp.date) <= new Date(endDate)
        : true;
      return matchesCategory && matchesDate;
    });
  };
  
  // Group expenses by category for analysis
  const analyzeExpenses = expenses => {
    return expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
  };
  
  module.exports = { validateExpense, filterExpenses, analyzeExpenses };
  