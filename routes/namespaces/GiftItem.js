const router = require("express").Router();

const GiftItemController = lulu.use("app/controllers/HTTP/GiftItemController");

router.route("/:id").get(GiftItemController.getGiftItemByIdHandler);
router.route("/all").get(GiftItemController.getGiftItemsHandler);
router.route("/create").post(GiftItemController.createGiftItemHandler);
router.route("/update").patch(GiftItemController.updateGiftItemHandler);
router.route("/delete").delete(GiftItemController.deleteGiftItemHandler);

module.exports = router;
