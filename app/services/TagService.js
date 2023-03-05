const Tag = lulu.use("app/models/mongoose/Tag");

module.exports = {
  createTag: async (data) => {
    return await Tag.create({ ...data });
  },
  getTagByQuery: async (query) => {
    return await Tag.findOne({ ...query });
  },
  getTagsByQuery: async (query, options = null) => {
    return await Tag.find({ ...query }, null, options);
  },
  updateTagByQuery: async (query, data) => {
    return await Tag.updateOne(
      { ...query },
      { ...data },
      {
        new: true,
        runValidators: true,
      }
    );
  },
  deleteTagByQuery: async (query, data) => {
    return await Tag.deleteOne({ ...query });
  },
};
