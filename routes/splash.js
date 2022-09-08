const express = require('express');
const router = express.Router();
const controller = require('../controllers/splash.controller');
const {allowIfLoggedin} = require('../middlewhere/auth.middleware');


router.post('/createSplash',allowIfLoggedin, controller.create);
router.get('/splashList', controller.getAll);
router.get('/:splashId',allowIfLoggedin, controller.getById);
router.post('/update/:key',allowIfLoggedin, controller.update);
router.post('/status/:key',allowIfLoggedin, controller.statusupdate);
router.post('/delete/:splashId',allowIfLoggedin, controller.delete);

module.exports = router
