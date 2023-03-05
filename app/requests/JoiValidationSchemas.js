const Joi = require("joi");
const JoiValidationError = lulu.use("app/errors/JoiValidationError");
const config = lulu.use("app.config");

module.exports = {
  AuthBindDeviceRequestSchema: Joi.object({
    source: Joi.string()
      .min(3)
      .max(100)
      .required()
      .error(() => new JoiValidationError("Source is required.", "source")),
    token: Joi.string()
      .min(3)
      .max(100)
      .required()
      .error(() => new JoiValidationError("Token is required.", "token")),
    optionals: Joi.object()
      .optional()
      .error(
        () =>
          new JoiValidationError(
            "Optionals is not properly formatted. It should be an Object",
            "optionals"
          )
      ),
  }),

  AuthRegisterRegularSchema: Joi.object({
    name: Joi.string()
      .min(3)
      .max(200)
      .required()
      .error(() => new JoiValidationError("Name is required.", "name")),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: config.app.allowedEmailDomainTLDs,
        },
      })
      .min(3)
      .max(150)
      .required()
      .error(
        () =>
          new JoiValidationError(
            "Email is not properly formatted or the TLD is not supported",
            "email"
          )
      ),
    password: Joi.string()
      .min(6)
      .max(32)
      .required()
      .error(
        () =>
          new JoiValidationError(
            "Password is required. Minimum 6 Letters. Maximum 32 Letters",
            "password"
          )
      ),
    confirm_password: Joi.ref("password"),
  }),
};

/* It's better use your own validation error with custom error message. Handler works fine. */
