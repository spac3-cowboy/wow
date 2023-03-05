const Country = lulu.use("app/models/mongoose/Country");

module.exports = {
  createCountry: async (data) => {
    return await Country.create({ ...data });
  },
  getCountryByQuery: async (query) => {
    return await Country.findOne({ ...query });
  },
  getCountriesByQuery: async (query, options = null) => {
    return await Country.find({ ...query }, null, options);
  },
  updateCountryByQuery: async (query, data) => {
    return await Country.updateOne(
      { ...query },
      { ...data },
      {
        new: true,
        runValidators: true,
      }
    );
  },
  deleteCountryByQuery: async (query, data) => {
    return await Country.deleteOne({ ...query });
  },
};
