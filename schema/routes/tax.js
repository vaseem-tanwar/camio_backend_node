const express = require('express');
const router = express.Router();
const controller = require('../controllers/tax.controller');

router.post('/createTax', controller.create);
router.get('/taxesList', controller.getAll);
router.post('/:taxId', controller.getById);
router.post('/:taxId/update', controller.update);
router.post('/:taxId/delete', controller.delete);
router.put('/:id', controller.statusupdate);

module.exports = router;