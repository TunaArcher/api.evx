/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

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
// router.get('/', HandleBadRequest, UserController.getAllUsers);
router.get('/:id', HandleBadRequest, UserController.getUser);
router.post('/create', HandleBadRequest, UserController.createUser);
router.post('/update', HandleBadRequest, UserController.updateUser);
router.post('/changePassword', HandleBadRequest, UserController.changePassword);

module.exports = router;
