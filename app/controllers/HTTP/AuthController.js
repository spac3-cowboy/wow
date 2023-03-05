const AppValidationError = require("../../errors/AppValidationError");

const Handler = lulu.use("app/errors/Handler");
const SysDeviceService = lulu.use("app/services/SysDeviceService");
const UserService = lulu.use("app/services/UserService");
const response = lulu.use("app/responses/Response");
const Event = lulu.use("app/responses/Event");

module.exports = {
  registerDevice: async (req, res) => {
    try {
      const data = {
        host: req.get("host"),
        ip: req.ip,
        ips: req.ips,
        userAgent: req.headers["user-agent"],
        token: req.body.token,
        source: req.headers.__source,
        optionals: req.body.optionals,
      };
      const sysDevice = await SysDeviceService.bindDevice(data);
      return response.dispatch(
        "Registration Successful.",
        {
          device: {
            token: sysDevice.token,
            tokenKind: sysDevice.tokenKind,
            kind: sysDevice.kind,
          },
          devNote:
            "Token is the only thing you need to send in headers to identify the device in all future requests as __device in request headers.",
        },
        res,
        200
      ); // wrap data in object to avoid confusion
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },
  registerRegular: async (req, res) => {
    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        baseRole: "User",
      };

      const user = await UserService.regularRegistration(data);
      user.password = undefined;
      return response.dispatch(
        "Registration Successful.",
        {
          user: user,
          devNote: "Proceed to login.",
        },
        res,
        200
      );
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },
  loginSocial: async (req, res) => {
    const {
      displayName,
      email,
      uid,
      photoURL,
      phoneNumber,
      providerId,
      refreshToken,
    } = req.body;
    try {
      if (
        ![displayName, email, uid, photoURL, phoneNumber, providerId].every(
          Boolean
        )
      ) {
        return response.error(
          Handler(new AppValidationError("Some fields are missing"))
        );
      }

      let data = null;
      data = {
        name: displayName,
        email,
        uid,
        profileImage: photoURL,
        phoneNumber,
        socialLogin: {
          provider: providerId,
          id: providerId,
          token: refreshToken || null,
          email,
          name,
          image: photoURL,
        },
      };

      const user = await UserService.loginSocial(data);
      return response.dispatch(
        "Login Successful !",
        {
          user: user,
          devNote: "user logged in .",
        },
        res,
        200
      );
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },
};
