/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const DepositController = require('../controllers/DepositController');

/*==============================
helper
==============================*/
const HandleBadRequest = require('../middlewares/HandleBadRequestMiddleware');

/*==============================
Middleware
==============================*/
// -

/*==============================
Router
==============================*/
router.get('/', HandleBadRequest, DepositController.getAllDeposit);
router.get('/:id', HandleBadRequest, DepositController.getDeposit);
router.post('/update', HandleBadRequest, DepositController.updateDeposit);

module.exports = router;
