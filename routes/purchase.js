const express = require('express')
const purchaseController = require('../controllers/purchase')
const userauthentication = require('../middleware/auth')
const router = express.Router();

router.get('/purchase/premiumMembership',userauthentication.authentication,purchaseController.purchasepremium)
router.post('/purchase/updatetransactionstatus', userauthentication.authentication, purchaseController.updatetransactionstatus)

module.exports = router;