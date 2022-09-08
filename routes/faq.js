const express = require('express');
const router = express.Router();
const controller = require('../controllers/faq.controller');
const {allowIfLoggedin} = require('../middlewhere/auth.middleware.js');

router.post('/createfaq',allowIfLoggedin, controller.create);
router.get('/faqesList',allowIfLoggedin, controller.getAll);
router.get('/:key',allowIfLoggedin, controller.getById);
router.post('/update/:key',allowIfLoggedin, controller.update);
router.post('/delete/:key',allowIfLoggedin, controller.delete);
router.post('/status/:key',allowIfLoggedin, controller.statusupdate);


module.exports = router;