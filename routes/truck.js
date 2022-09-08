const express = require('express');
const router = express.Router();
const controller = require('../controllers/truck.controller');
const {allowIfLoggedin} = require('../middlewhere/auth.middleware.js');

router.post('/createtruck',allowIfLoggedin, controller.create);
router.post('/truckesList',allowIfLoggedin, controller.getAll);
router.post('/:truckId',allowIfLoggedin, controller.getById);
router.post('/:truckId/update',allowIfLoggedin, controller.update);
router.post('/:truckId/delete',allowIfLoggedin, controller.delete);
router.post('/:truckId/truckIsactive',allowIfLoggedin, controller.statusupdate);

module.exports = router;