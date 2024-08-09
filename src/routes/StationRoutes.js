/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const StationController = require('../controllers/StationController');

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
router.get('/', HandleBadRequest, StationController.getAllStations);
router.get('/:id', HandleBadRequest, StationController.getStation);
router.post('/update', HandleBadRequest, StationController.updateStation);

module.exports = router;
