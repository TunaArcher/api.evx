/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const OwnerStationController = require('../controllers/OwnerStationController');

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
router.get('/', HandleBadRequest, OwnerStationController.getAllOwnerStations);
router.get('/:id', HandleBadRequest, OwnerStationController.getOwnerStation);
router.post('/update', HandleBadRequest, OwnerStationController.updateOwnerStation);

module.exports = router;
