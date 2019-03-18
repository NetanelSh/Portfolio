const express = require("express");
const router = express.Router();

const authService = require('../services/auth');

const portfolioCtrl = require('../controllers/portfolio');

router.post('', authService.checkJWT, authService.checkRole('siteOwner'), portfolioCtrl.savePortfolio);

router.get('', portfolioCtrl.getPortfolios);

router.get('/:id', portfolioCtrl.getPortfolioById);

router.patch('/:id', authService.checkJWT, authService.checkRole('siteOwner'), portfolioCtrl.updatePortfolio);

router.delete('/:id', authService.checkJWT, authService.checkRole('siteOwner'), portfolioCtrl.deletePortfolio);

module.exports = router;