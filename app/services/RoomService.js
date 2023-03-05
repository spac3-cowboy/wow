const Room = lulu.use("app/models/mongoose/Room");

module.exports = {
  createRoom: async (data) => {
    return await Room.create({ ...data });
  },
  getRoomByQuery: async (query) => {
    return await Room.findOne({ ...query });
  },
  getRoomsByQuery: async (query, options = null) => {
    return await ChatThread.find({ ...query }, null, options);
  },
  updateRoomByQuery: async (query, data) => {
    return await Room.updateOne(
      { ...query },
      { ...data },
      {
        new: true,
        runValidators: true,
      }
    );
  },
  deleteRoomByQuery: async (query, data) => {
    return await Room.deleteOne({ ...query });
  },
};
