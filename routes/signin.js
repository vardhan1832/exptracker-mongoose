const express = require('express')
const signinController = require('../controllers/signin')
const router = express.Router();

router.post('/sign-up',signinController.postUserDetails)

module.exports = router;