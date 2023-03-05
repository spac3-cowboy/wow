const Gift = lulu.use("app/models/mongoose/Gift");
module.exports = {
  createGift: async (data) => {
    return await Gift.create({ ...data });
  },
  getGiftByQuery: async (query) => {
    return await Gift.findOne({ ...query });
  },
  getGiftsByQuery: async (query, options = null) => {
    return await Gift.find({ ...query }, null, options);
  },
  updateGiftByQuery: async (query, data) => {
    return await Gift.updateOne(
      { ...query },
      { ...data },
      {
        new: true,
        runValidators: true,
      }
    );
  },
  deleteGiftByQuery: async (query, data) => {
    return await Gift.deleteOne({ ...query });
  },
};
