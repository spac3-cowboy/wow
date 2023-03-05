const ChatThreadItem = lulu.use("app/models/mongoose/ChatThreadItem");

module.exports = {
  createChatThreadItem: async (data) => {
    return await ChatThreadItem.create({ ...data });
  },
  getChatThreadItemByQuery: async (query) => {
    return await ChatThreadItem.findOne({ ...query });
  },
  getChatThreadItemsByQuery: async (query, options = null) => {
    return await ChatThreadItem.find({ ...query }, null, options);
  },
  updateChatThreadItemByQuery: async (query, data) => {
    return await ChatThreadItem.updateOne(
      { ...query },
      { ...data },
      {
        new: true,
        runValidators: true,
      }
    );
  },
  deleteChatThreadItemByQuery: async (query) => {
    return await ChatThreadItem.deleteOne({ ...query });
  },
  deleteChatThreadItemsByQuery: async (query, data) => {
    return await ChatThreadItem.deleteMany({ ...query });
  },
};
