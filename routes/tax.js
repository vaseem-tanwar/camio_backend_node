const express = require('express');
const router = express.Router();
const controller = require('../controllers/tax.controller');
const {allowIfLoggedin} = require('../middlewhere/auth.middleware.js');

router.post('/createTax',allowIfLoggedin, controller.create);
router.post('/taxesList',allowIfLoggedin, controller.getAll);
router.post('/:taxId',allowIfLoggedin, controller.getById);
router.post('/:taxId/update',allowIfLoggedin, controller.update);
router.post('/:taxId/delete',allowIfLoggedin, controller.delete);
router.post('/:taxId/taxIsactive',allowIfLoggedin, controller.statusupdate);

//search tax route
router.post('/search/tax',allowIfLoggedin, controller.searchTax);

module.exports = router;