const express = require('express')
const premiumController = require('../controllers/premiumfeature')
const userauthentication = require('../middleware/auth')
const router = express.Router();

router.get('/premium/showleaderboard',userauthentication.authentication,premiumController.getleaderboard)
router.get('/user/download',userauthentication.authentication,premiumController.downloadreport)
router.get('/user/display',userauthentication.authentication,premiumController.displayreport)

module.exports = router;