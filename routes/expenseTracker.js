const express = require('express')
const expenseController = require('../controllers/expenseTracker');
const userauthentication = require('../middleware/auth')
const router = express.Router();

router.post('/add-expense',userauthentication.authentication ,expenseController.postExpenses);
router.get('/add-expense/:page',userauthentication.authentication ,expenseController.getExpenses)
router.delete('/add-expense/:expid',userauthentication.authentication ,expenseController.deleteExpense)

module.exports = router;
