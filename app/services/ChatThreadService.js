const ChatThread = lulu.use("app/models/mongoose/ChatThread");
module.exports = {
  createChatThread: async (data) => {
    return await ChatThread.create({ ...data });
  },
  getChatThreadByQuery: async (query) => {
    return await ChatThread.findOne({ ...query });
  },
  getChatThreadsByQuery: async (query, options = null) => {
    return await ChatThread.find({ ...query }, null, options);
  },
  updateChatThreadByQuery: async (query, data) => {
    return await ChatThread.updateOne(
      { ...query },
      { ...data },
      {
        new: true,
        runValidators: true,
      }
    );
  },
  deleteChatThreadByQuery: async (query) => {
    return await ChatThread.deleteOne({ ...query });
  },
};
