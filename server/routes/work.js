const express = require("express");
const router = express.Router();

const authService = require('../services/auth');

const workCtrl = require('../controllers/work');

router.post('', authService.checkJWT, authService.checkRole('siteOwner'), workCtrl.saveWork);

router.get('', workCtrl.getWorks);

router.get('/:id', workCtrl.getWorkById);

router.patch('/:id', authService.checkJWT, authService.checkRole('siteOwner'), workCtrl.updateWork);

router.delete('/:id', authService.checkJWT, authService.checkRole('siteOwner'), workCtrl.deleteWork);

module.exports = router;