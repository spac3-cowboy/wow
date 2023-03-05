const Handler = lulu.use("app/errors/Handler");
const GiftService = lulu.use("app/services/GiftService");
const response = lulu.use("app/responses/Response");
const Event = lulu.use("app/responses/Event");

module.exports = {
  createGiftHandler: async function (req, res) {
    try {
      const gift = await GiftService.createGift(req.body);
      return response.dispatch("Gift Created ", { gift }, res, 200); // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  getGiftByIdHandler: async function (req, res) {
    try {
      const gift = await GiftService.getGiftByQuery({
        id: req.params.id,
      });
      return response.dispatch("Gift found !", { gift }, res, 200);
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  getGiftsHandler: async function (req, res) {
    try {
      const gifts = await GiftService.getGiftsByQuery();
      return response.dispatch("Gifts found", { gifts }, res, 200);
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  updateGiftHandler: async function (req, res) {
    try {
      let { id } = req.params;
      const updatedGift = await GiftService.updateGift({ id }, { ...req.body });
      return response.dispatch(
        "Gift updated ! ",
        { gift: updatedGift },
        res,
        200
      );
      // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  deleteGiftHandler: async function (req, res) {
    try {
      await GiftService.deleteGiftByQuery({ id: req.params.id });
      return response.dispatch("Gift deleted successfully ", null, res, 200); // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
};
