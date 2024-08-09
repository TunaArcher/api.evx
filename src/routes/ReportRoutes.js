/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/ReportController');

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
// Service
router.get('/history-serviced', HandleBadRequest, ReportController.getReportHistoryServiced);

// Booking
router.get('/booking', HandleBadRequest, ReportController.getReportBooking);

// Topup
// router.get('/topup', HandleBadRequest, ReportController.getReportTopup);

module.exports = router;
