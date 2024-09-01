const express = require("express");
const { AuthRequestValidators } = require("../../middlwares/index");

const router = express.Router();

const UserController = require("../../controllers/user-controller");

router.post(
  "/signup",
  AuthRequestValidators.validateUserAuth,
  UserController.create
);

router.post(
  "/signin",
  AuthRequestValidators.validateUserAuth,
  UserController.signIn
);

router.get(
  '/isAdmin',
  AuthRequestValidators.validateisAdminRequest,
  UserController.isAdmin
)

router.get("/isAuthenticated", UserController.isAuthenticated);

module.exports = router;
