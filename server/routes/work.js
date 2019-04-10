const express = require("express");
const router = express.Router();

const authService = require('../services/auth');

const workCtrl = require('../controllers/work');

router.post('', authService.checkJWT, authService.checkRole('siteOwner'), workCtrl.savePortfolio);

router.get('', workCtrl.getPortfolios);

router.get('/:id', workCtrl.getPortfolioById);

router.patch('/:id', authService.checkJWT, authService.checkRole('siteOwner'), workCtrl.updatePortfolio);

router.delete('/:id', authService.checkJWT, authService.checkRole('siteOwner'), workCtrl.deletePortfolio);

module.exports = router;