const Handler = lulu.use("app/errors/Handler");
const GiftItemService = lulu.use("app/services/GiftItemService");
const response = lulu.use("app/responses/Response");
const Event = lulu.use("app/responses/Event");

module.exports = {
  createGiftItemHandler: async function (req, res) {
    try {
      const giftItem = await GiftItemService.createGiftItem(req.body);
      return response.dispatch("GiftItem Created ", { giftItem }, res, 200); // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  getGiftItemByIdHandler: async function (req, res) {
    try {
      const giftItem = await GiftItemService.getGiftItemByQuery({
        id: req.params.id,
      });
      return response.dispatch("GiftItem found !", { giftItem }, res, 200);
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  getGiftItemsHandler: async function (req, res) {
    try {
      const giftItems = await GiftItemService.getGiftItemsByQuery();
      return response.dispatch("GiftItems found", { giftItems }, res, 200);
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  updateGiftItemHandler: async function (req, res) {
    try {
      let { id } = req.params;
      const updatedGiftItem = await GiftItemService.updateGiftItemByQuery(
        { id },
        { ...req.body }
      );
      return response.dispatch(
        "GiftItem updated ! ",
        { giftItem: updatedGiftItem },
        res,
        200
      );
      // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  deleteGiftItemHandler: async function (req, res) {
    try {
      await GiftItemService.deleteGiftItemByQuery({ id: req.params.id });
      return response.dispatch(
        "GiftItem deleted successfully ",
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
