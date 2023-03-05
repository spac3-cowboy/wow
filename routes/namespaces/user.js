const express = require("express");
const router = express.Router();

const UserController = lulu.use("app/controllers/HTTP/UserController");

// const RegularUserRegistrationRequest = lulu.use(
//   "app/requests/RegularUserRegistrationRequest"
// );

router.get("/", (req, res) => {
  res.send("Hi From User API namespace");
});

router.post(
  "/user/register/regular",
  [
    // RegularUserRegistrationRequest
  ],
  UserController.registerRegular
);

router.post("/user/login", UserController.loginUser);

module.exports = router;
