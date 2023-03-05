const router = require("express").Router();

const SysDeviceController = lulu.use(
  "app/controllers/HTTP/SysDeviceController"
);

router.route("/:id").get(SysDeviceController.getSysDeviceByIdHandler);
router.route("/all").get(SysDeviceController.getSysDevicesHandler);
router.route("/create").post(SysDeviceController.createSysDeviceHandler);
router.route("/update").patch(SysDeviceController.updateSysDeviceHandler);
router.route("/delete").delete(SysDeviceController.deleteSysDeviceHandler);

module.exports = router;
