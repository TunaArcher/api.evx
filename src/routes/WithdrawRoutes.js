/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const WithdrawController = require('../controllers/WithdrawController');

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
router.get('/', HandleBadRequest, WithdrawController.getAllWithdraw);
router.get('/:id', HandleBadRequest, WithdrawController.getWithdraw);
router.post('/update', HandleBadRequest, WithdrawController.updateWithdraw);

module.exports = router;
