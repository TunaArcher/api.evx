const express = require('express');
const AsyncHandler = require('express-async-handler');
const ApiResponse = require('../controllers/response/ApiResponse');
const { StatusCodes } = require('http-status-codes');

/*==============================
Development guide:-
  - Create separate .js file for each endpoints and import these files here (e.g. AdminRoutes.js)
  - Wrap the controller with AsyncHandler, it will deal with try {} catch(e) {} wrapping of async program.

==============================*/

// importing all routes
const router = express.Router();
const AuthRoutes = require('./AuthRoutes');
const UserRoutes = require('./UserRoutes');

// router.use(
//     '/',
//     AsyncHandler(async (req, res) => {
//         res.json(ApiResponse('Api Running Successfully.', null, StatusCodes.CREATED));
//     })
// );

// assign prefix - to routes
router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);

module.exports = router;
