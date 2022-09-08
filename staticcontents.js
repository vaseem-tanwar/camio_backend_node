﻿const express = require('express');
const router = express.Router();
const controller = require('../controllers/staticcontents.controller');

router.post('/', controller.create);
router.post('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.put('/:id', controller.statusupdate);
router.delete('/:id', controller.delete);

module.exports = router;
