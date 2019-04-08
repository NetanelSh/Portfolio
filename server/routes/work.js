const express = require("express");
const router = express.Router();

const authService = require("../services/auth");

const workCtrl = require("../controllers/work");

router.post(
  "",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  workCtrl.createWork
);

router.get("/:id", workCtrl.getWorkById);

// router.get("", portfolioCtrl.getPortfolios);

// router.patch(
//   "/:id",
//   authService.checkJWT,
//   authService.checkRole("siteOwner"),
//   portfolioCtrl.updatePortfolio
// );

// router.delete(
//   "/:id",
//   authService.checkJWT,
//   authService.checkRole("siteOwner"),
//   portfolioCtrl.deletePortfolio
// );

module.exports = router;
