const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
// const HandleBadRequest = require('../middlewares/HandleBadRequestMiddleware');
// const UserRoutesValidations = require('./validators/UserRoutes.validators');

router.get('/test', UserController.index);

module.exports = router;
