/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

/*==============================
helper
==============================*/
const HandleBadRequest = require('../middlewares/HandleBadRequestMiddleware');
const AuthRoutesValidations = require('./validators/AuthRoutes.validators');

/*==============================
Middleware
==============================*/
// -

/*==============================
Router
==============================*/
router.post('/register', AuthRoutesValidations.registerValidation, HandleBadRequest, AuthController.register);
router.post('/login', AuthRoutesValidations.loginValidation, HandleBadRequest, AuthController.login);

module.exports = router;
