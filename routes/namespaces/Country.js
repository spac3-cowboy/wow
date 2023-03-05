const router = require("express").Router();

const CountryController = lulu.use("app/controllers/HTTP/CountryController");

router.route("/:id").get(CountryController.getCountryByIdHandler);
router.route("/all").get(CountryController.getCountriesHandler);
router.route("/create").post(CountryController.createCountryHandler);
router.route("/update").patch(CountryController.updateCountryHandler);
router.route("/delete").delete(CountryController.deleteCountryHandler);

module.exports = router;
