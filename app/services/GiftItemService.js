const GiftItem = lulu.use("app/models/mongoose/GiftItem");

module.exports = {
  createGiftItem: async (data) => {
    return await GiftItem.create({ ...data });
  },
  getGiftItemByQuery: async (query) => {
    return await GiftItem.findOne({ ...query });
  },
  getGiftItemsByQuery: async (query, options = null) => {
    return await GiftItem.find({ ...query }, null, options);
  },
  updateGiftItemByQuery: async (query, data) => {
    return await GiftItem.updateOne(
      { ...query },
      { ...data },
      {
        new: true,
        runValidators: true,
      }
    );
  },
  deleteGiftItemByQuery: async (query, data) => {
    return await GiftItem.deleteOne({ ...query });
  },
};
