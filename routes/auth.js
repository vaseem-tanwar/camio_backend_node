// server/routes/route.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const middleware = require('../middlewhere/auth.middleware');

//signup route
router.post('/signup', controller.signup);

//login route
router.post('/login', controller.login);

//add user route
router.post('/createUser', controller.create);

//search user route
router.post('/search-user', controller.searchUser);

//user list route
router.post('/usersList', controller.getUsers);

router.post('/usersList', controller.getUsers);

//get one user route
router.post('/:userId', controller.getUser);

//add shipper route
router.post('/shippers/post', controller.postshippers);

// get shipper route
router.post('/shippers/get', controller.getshippers);

//post truckowner route
router.post('/truckowner/post', controller.posttruckowner);

//get truckowner only route
router.post('/truckowner/get', controller.gettruckowner);

// get truck driver only route
router.post('/truckdriver/get', controller.gettruckdriver);

// post truck driver only route
router.post('/truckdriver/post', controller.posttruckdriver);

// status change api
router.post('/:userId/userIsactive', controller.changeStatus);

// update user route
router.post('/:userId/update', controller.updateUser);

// delete user
router.post('/:userId/delete', controller.deleteUser);

// update password route
router.post('/update/password', controller.updatePassword);




module.exports = router;