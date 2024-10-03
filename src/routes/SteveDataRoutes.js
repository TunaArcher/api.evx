/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const SteveDataController = require('../controllers/SteveDataController');

/*==============================
helper
==============================*/
const HandleBadRequest = require('../middlewares/HandleBadRequestMiddleware');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

/*==============================
Middleware
==============================*/
// -

/*==============================
Router
==============================*/
// router.get('/', HandleBadRequest, UserController.getAllUsers);
router.post('/getEVStation', HandleBadRequest, SteveDataController.getStation);
router.post('/getConnecter', HandleBadRequest, SteveDataController.getConnecter);
router.post('/getConnecterStatus', HandleBadRequest, SteveDataController.getConnecterStatus);  
router.post('/getStartTransectionLast', HandleBadRequest, SteveDataController.getStartTransectionLast);

module.exports = router;
