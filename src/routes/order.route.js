const express = require('express');
const router = express.Router();
const {addOrder} = require('../controllers/order.controller');
const {isAuthenticated} = require('../middlewares/authenticationChecking.middleware');

router.post('/addOrder',isAuthenticated,addOrder);

module.exports = router;