const express = require('express');
const router = express.Router();
const controller = require('../controllers/commission.controller');
const {allowIfLoggedin} = require('../middlewhere/auth.middleware.js');

router.post('/createcommission',allowIfLoggedin, controller.create);
router.post('/commissionesList',allowIfLoggedin, controller.getAll);
router.post('/:commissionId',allowIfLoggedin, controller.getById);
router.post('/:commissionId/update',allowIfLoggedin, controller.update);
router.post('/:commissionId/delete',allowIfLoggedin, controller.delete);
router.post('/:commissionId/commissionIsactive',allowIfLoggedin, controller.statusupdate);


module.exports = router;