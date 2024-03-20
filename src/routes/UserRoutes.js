/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

/*==============================
helper
==============================*/
// const HandleBadRequest = require('../middlewares/HandleBadRequestMiddleware');
// const UserRoutesValidations = require('./validators/UserRoutes.validators');

/*==============================
Middleware
==============================*/
const Auth = require('../middlewares/AuthMiddleware'); // Verify JWT

/*==============================
router
==============================*/
router.get('/data', Auth, UserController.index);

module.exports = router;
