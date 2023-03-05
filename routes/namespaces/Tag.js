const router = require("express").Router();

const TagController = lulu.use("app/controllers/HTTP/TagController");

router.route("/:id").get(TagController.getTagByIdHandler);
router.route("/all").get(TagController.getTagsHandler);
router.route("/create").post(TagController.createTagHandler);
router.route("/update").patch(TagController.updateTagHandler);
router.route("/delete").delete(TagController.deleteTagHandler);

module.exports = router;
