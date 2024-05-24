/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');

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
router.post('/update_profile', HandleBadRequest, ProfileController.updateProfile);
router.post('/get_profile', HandleBadRequest, ProfileController.porfileData);


module.exports = router;
