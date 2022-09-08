const express = require('express');
const router = express.Router();
const controller = require('../controllers/trucktype.controller');
const {allowIfLoggedin} = require('../middlewhere/auth.middleware');


router.post('/createTruck',allowIfLoggedin, controller.create);
router.get('/trucksList', controller.getAll);
router.get('/:truckId',allowIfLoggedin, controller.getById);
router.post('/update/:truckId',allowIfLoggedin, controller.update);
router.post('/delete/:truckId',allowIfLoggedin, controller.delete);

module.exports = router
