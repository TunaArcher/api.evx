/*==============================
core
==============================*/
const express = require('express');

/*==============================
helper
==============================*/
const AsyncHandler = require('express-async-handler');
const ApiResponse = require('../controllers/response/ApiResponse');
const { StatusCodes } = require('http-status-codes');

// importing all routes
const router = express.Router();
const AuthRoutes = require('./AuthRoutes');
const UserRoutes = require('./UserRoutes');
const OwnerStationRoutes = require('./OwnerStationRoutes');
const StationRoutes = require('./StationRoutes');
const ChargePointRoutes = require('./ChargePointRoutes');
const DepositRoutes = require('./DepositRoutes');
const WithdrawRoutes = require('./WithdrawRoutes');
const ReportRoutes = require('./ReportRoutes');

// assign prefix - to routes
// การ Auth
router.use('/auth', AuthRoutes);

// ยูสเซอร์
router.use('/user', UserRoutes);

// เจ้าของสถานี
router.use('/owner-station', OwnerStationRoutes);

// สถานี
router.use('/station', StationRoutes);

// สถานี
router.use('/charge-point', ChargePointRoutes);

// การจอง
// router.use('/booking', BookingRoutes);

/** Topup **/
// เติมเงิน
router.use('/deposit', DepositRoutes);
// หักเงิน
router.use('/withdraw', WithdrawRoutes);

// รายงาน
router.use('/report', ReportRoutes);

module.exports = router;
