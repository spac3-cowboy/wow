const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hi From API");
});

/* Namespaces */
router.use("/auth", require("./namespaces/Auth"));
router.use("/user", require("./namespaces/User"));
router.use("/country", require("./namespaces/country")); //done
router.use("/gift", require("./namespaces/gift")); //done
router.use("/gift-item", require("./namespaces/giftItem")); //done
router.use("/tag", require("./namespaces/tag")); //done
router.use("/sys-device", require("./namespaces/sysDevice")); //done

/* Namespaces */

module.exports = router;
