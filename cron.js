
const cron = require("node-cron");
const { expenses } = require("./data");
const { analyzeExpenses } = require("./utils");

/**
 * Generates a summary of expenses grouped by category.
 */
const generateSummary = (period) => {
  const now = new Date();
  const summary = analyzeExpenses(expenses);

  // Format summary based on the period
  console.log(`[${now.toISOString()}] ${period} Summary:`, summary);
};

// Daily summary at midnight
cron.schedule("0 0 * * *", () => {
  generateSummary("Daily");
});

// Weekly summary at midnight every Sunday
cron.schedule("0 0 * * 0", () => {
  generateSummary("Weekly");
});

// Monthly summary at midnight on the 1st of each month
cron.schedule("0 0 1 * *", () => {
  generateSummary("Monthly");
});

console.log("CRON jobs initialized.");
