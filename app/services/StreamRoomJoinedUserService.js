const StreamRoomJoinedUser = lulu.use(
  "app/models/mongoose/StreamRoomJoinedUser"
);

module.exports = {
  createStreamRoomJoinedUser: async (data) => {
    return await StreamRoomJoinedUser.create({ ...data });
  },
  getStreamRoomJoinedUserByQuery: async (query) => {
    return await StreamRoomJoinedUser.findOne({ ...query });
  },
  getStreamRoomJoinedUsersByQuery: async (query, options = null) => {
    return await StreamRoomJoinedUser.find({ ...query }, null, options);
  },
  updateStreamRoomJoinedUserByQuery: async (query, data) => {
    return await StreamRoomJoinedUser.updateOne(
      { ...query },
      { ...data },
      {
        new: true,
        runValidators: true,
      }
    );
  },
  deleteStreamRoomJoinedUserByQuery: async (query, data) => {
    return await StreamRoomJoinedUser.deleteOne({ ...query });
  },
};
