const Handler = lulu.use("app/errors/Handler");
const CountryService = lulu.use("app/services/CountryService");
const response = lulu.use("app/responses/Response");
const Event = lulu.use("app/responses/Event");

module.exports = {
  createCountryHandler: async function (req, res) {
    try {
      const country = await CountryService.createCountry(req.body);
      return response.dispatch("Country Created ", { country }, res, 200); // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  getCountryByIdHandler: async function (req, res) {
    try {
      const country = await CountryService.getCountryByQuery({
        id: req.params.id,
      });
      return response.dispatch("Country found !", { country }, res, 200);
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  getCountriesHandler: async function (req, res) {
    try {
      const countries = await CountryService.getCountriesByQuery();
      return response.dispatch("Countries found", { countries }, res, 200);
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  updateCountryHandler: async function (req, res) {
    try {
      let { id } = req.params;
      const updatedCountry = await CountryService.updateCountryByQuery(
        { id },
        { ...req.body }
      );
      return response.dispatch(
        "Country updated ! ",
        { country: updatedCountry },
        res,
        200
      );
      // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  deleteCountryHandler: async function (req, res) {
    try {
      await CountryService.deleteCountryByQuery({ id: req.params.id });
      return response.dispatch("Country deleted successfully ", null, res, 200); // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
};
