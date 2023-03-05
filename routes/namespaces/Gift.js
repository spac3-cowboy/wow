const router = require("express").Router();

const GiftController = lulu.use("app/controllers/HTTP/GiftController");

router.route("/:id").get(GiftController.getGiftByIdHandler);
router.route("/all").get(GiftController.getGiftsHandler);
router.route("/create").post(GiftController.createGiftHandler);
router.route("/update").patch(GiftController.updateGiftHandler);
router.route("/delete").delete(GiftController.deleteGiftHandler);

module.exports = router;
