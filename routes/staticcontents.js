const express = require('express');
const router = express.Router();
const controller = require('../controllers/staticcontents.controller');
const {allowIfLoggedin} = require('../middlewhere/auth.middleware.js');

router.post('/create' ,allowIfLoggedin ,controller.create);
router.get('/list',allowIfLoggedin , controller.getAll);
router.get('getbyid/:id',allowIfLoggedin , controller.getById);
router.put('update/:id',allowIfLoggedin , controller.update);
router.put('statusupdate/:id',allowIfLoggedin , controller.statusupdate);
router.delete('delete/:id',allowIfLoggedin , controller.delete);

module.exports = router;