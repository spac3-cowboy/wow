const Handler = lulu.use("app/errors/Handler");
const ThreadService = lulu.use("app/services/ThreadService");
const response = lulu.use("app/responses/Response");
const Event = lulu.use("app/responses/Event");

module.exports = {
  createThreadHandler: async function (req, res) {
    try {
      const thread = await ThreadService.createThread(req.body);
      return response.dispatch("ChatThreadItem Created ", { thread }, res, 200); // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  updateThreadHandler: async function (req, res) {
    try {
      let { id } = req.params;
      const updatedThread = await ThreadService.updateThread(
        { id },
        { ...req.body }
      );
      return response.dispatch(
        "ChatThreadItem updated ! ",
        { thread: updatedThread },
        res,
        200
      );
      // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  deleteThreadHandler: async function (req, res) {
    try {
      await ThreadService.deleteThreadByQuery({ id: req.params.id });
      return response.dispatch(
        "ChatThreadItem deleted successfully ",
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
