const express = require('express');
const router = express.Router();
const controller = require('../controllers/trucktype.controller');

router.post('/createTruck', controller.create);
router.get('/trucksList', controller.getAll);
router.get('/:truckId', controller.getById);
router.post('/:truckId/update', controller.update);
router.post('/:truckId/delete', controller.delete);

module.exports = router