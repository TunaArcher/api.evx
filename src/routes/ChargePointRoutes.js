/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const ChargePointController = require('../controllers/ChargePointController');

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
router.get('/', HandleBadRequest, ChargePointController.getAllChargePoints);
router.get('/:id', HandleBadRequest, ChargePointController.getChargePoint);
router.post('/status', HandleBadRequest, ChargePointController.getChargePointByStatus);
router.post('/update', HandleBadRequest, ChargePointController.updateChargePoint);

module.exports = router;
