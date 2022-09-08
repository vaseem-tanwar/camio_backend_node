// server/routes/route.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const middleware = require('../middlewhere/auth.middleware');

router.post('/signup', controller.signup);

router.post('/login', controller.login);

router.post('/createUser', controller.create);

router.get('/search-user/:key', controller.searchUser);

 router.get('/usersList',  controller.getUsers);

router.get('/usersList',   controller.getUsers);

router.post('/:userId', controller.getUser);

router.post('/shippers/post', controller.postshippers);

router.get('/shippers/get', controller.getshippers);

//post truckowner route
router.post('/truckowner/post', controller.posttruckowner);

//get truckowner only route
router.get('/truckowner/get', controller.gettruckowner);

// get truck driver only route
router.get('/truckdriver/get', controller.gettruckdriver);

// post truck driver only route
router.post('/truckdriver/post', controller.posttruckdriver);

router.post('/:userId/userIsactive', controller.changeStatus);


router.post('/:userId/update',  controller.updateUser);

router.post('/:userId/delete', controller.deleteUser);



module.exports = router;