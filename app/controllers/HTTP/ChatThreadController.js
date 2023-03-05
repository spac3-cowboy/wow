const Handler = lulu.use("app/errors/Handler");
const ChatThreadService = lulu.use("app/services/ChatThreadService");
const response = lulu.use("app/responses/Response");
const Event = lulu.use("app/responses/Event");

module.exports = {
  createChatThreadHandler: async function (req, res) {
    try {
      const conversation = await ChatThreadService.createChatThread(req.body);
      return response.dispatch(
        "ChatThread Created ",
        { conversation },
        res,
        200
      ); // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  getChatThreadByIdHandler: async function (req, res) {
    try {
      const conversation = await ChatThreadService.getChatThreadByQuery(
        req.params.id
      );
      return response.dispatch(
        "ChatThread Created ",
        { conversation },
        res,
        200
      ); // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  getChatThreadsByUserIdHandler: async function (req, res) {
    try {
      const conversation = await ChatThreadService.getChatThreadsByQuery(
        req.params.userId
      );
      return response.dispatch(
        "ChatThread Created ",
        { conversation },
        res,
        200
      ); // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  updateChatThreadHandler: async function (req, res) {
    try {
      let { id } = req.params;
      const updatedChatThread = await ChatThreadService.updateChatThreadByQuery(
        { id },
        { ...req.body }
      );
      return response.dispatch(
        "ChatThread updated ! ",
        { conversation: updatedChatThread },
        res,
        200
      );
      // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  deleteChatThreadHandler: async function (req, res) {
    let { id } = req.params;
    try {
      await ChatThreadService.deleteChatThreadByQuery({ id });
      return response.dispatch(
        "ChatThread deleted successfully ",
        null,
        res,
        200
      ); // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
};
