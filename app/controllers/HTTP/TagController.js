const Handler = lulu.use("app/errors/Handler");
const TagService = lulu.use("app/services/TagService");
const response = lulu.use("app/responses/Response");
const Event = lulu.use("app/responses/Event");

module.exports = {
  createTagHandler: async function (req, res) {
    try {
      const tag = await TagService.createTag(req.body);
      return response.dispatch("Tag Created ", { tag }, res, 200); // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  getTagByIdHandler: async function (req, res) {
    try {
      const tag = await TagService.getTagByQuery({
        id: req.params.id,
      });
      return response.dispatch("Tag found !", { tag }, res, 200);
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  getTagsHandler: async function (req, res) {
    try {
      const tags = await TagService.getTagsByQuery();
      return response.dispatch("Tags found", { tags }, res, 200);
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  updateTagHandler: async function (req, res) {
    try {
      let { id } = req.params;
      const updatedTag = await TagService.updateTag({ id }, { ...req.body });
      return response.dispatch("Tag updated ! ", { tag: updatedTag }, res, 200);
      // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  deleteTagHandler: async function (req, res) {
    try {
      await TagService.deleteTagByQuery({ id: req.params.id });
      return response.dispatch("Tag deleted successfully ", null, res, 200); // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
};
