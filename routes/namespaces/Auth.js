const express = require("express");
const router = express.Router();

const AuthController = lulu.use("app/controllers/HTTP/AuthController");

/* Request Validators */
const AuthBindDeviceRequest = lulu.use("app/requests/AuthBindDeviceRequest");
const AuthRegisterRegularRequest = lulu.use(
  "app/requests/AuthRegisterRegularRequest"
);
/* Request Validators */

router.get("/", (req, res) => {
  res.send("Hi From Auth API namespace");
});

router.post(
  "/bind/device",
  [AuthBindDeviceRequest],
  AuthController.registerDevice
);

router.post(
  "/register/regular",
  [AuthRegisterRegularRequest],
  AuthController.registerRegular
);

router.post("/social-login", AuthController.loginSocial);

module.exports = router;
