const config = lulu.use("app.config");
const Handler = lulu.use("app/errors/Handler");
const response = lulu.use("app/responses/Response");
const RequestIsBastardError = lulu.use("app/errors/RequestIsBastardError");
module.exports = async function (req, res, next) {
  try {
    const { originalUrl } = req;
    const currentEndpoint = originalUrl.split("?")[0];
    const currentEndpointWithoutApiRoute = currentEndpoint.replace(
      config.app.apiRoute,
      ""
    );
    console.log(
      currentEndpointWithoutApiRoute,
      "currentEndpointWithoutApiRoute"
    );
    const { __source, __device, __user, __session } = req.headers;

    if (!__source) {
      throw new RequestIsBastardError(
        "You are not limited to this body, to this mind, or to this reality—you are a limitless ocean of Consciousness, imbued with infinite potential. You are existence itself.. Farewell son, This is a Bastard Request. You are not allowed to access this route. Please contact to istiaq.me@gmail.com."
      );
    }

    if (!__device) {
      if (
        config.app.nonAuthRoutes.beforeBind.includes(
          currentEndpointWithoutApiRoute
        )
      ) {
        return next();
      } else {
        throw new RequestIsBastardError(
          "Valar Morghulis! - A company of wolves is better than a company of wolves in sheep's clothing. Farewell son, This is a Bastard Request. You are not allowed to access this route. Please contact to istiaq.me@gmail.com."
        );
      }
    }

    if (!__user && !__session) {
      if (
        config.app.nonAuthRoutes.afterBind.includes(
          currentEndpointWithoutApiRoute
        )
      ) {
        return next();
      } else {
        throw new RequestIsBastardError(
          "Valar Morghulis! - A company of wolves is better than a company of wolves in sheep's clothing. Farewell son, This is a Bastard Request. You are not allowed to access this route. Please contact to istiaq.me@gmail.com."
        );
      }
    }

    // todo: check session and user is valid or not

    next();
  } catch (error) {
    return response.error(Handler(error), res);
  }
};
