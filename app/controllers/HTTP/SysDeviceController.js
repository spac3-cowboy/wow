const Handler = lulu.use("app/errors/Handler");
const SysDeviceService = lulu.use("app/services/SysDeviceService");
const response = lulu.use("app/responses/Response");
const Event = lulu.use("app/responses/Event");

module.exports = {
  createSysDeviceHandler: async function (req, res) {
    try {
      const sysDevice = await SysDeviceService.createSysDevice(req.body);
      return response.dispatch("SysDevice Created ", { sysDevice }, res, 200); // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  getSysDeviceByIdHandler: async function (req, res) {
    try {
      const sysDevice = await SysDeviceService.getSysDeviceByQuery({
        id: req.params.id,
      });
      return response.dispatch("SysDevice found !", { sysDevice }, res, 200);
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  getSysDevicesHandler: async function (req, res) {
    try {
      const sysDevices = await SysDeviceService.getSysDevicesByQuery();
      return response.dispatch("SysDevices found", { sysDevices }, res, 200);
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  updateSysDeviceHandler: async function (req, res) {
    try {
      let { id } = req.params;
      const updatedSysDevice = await SysDeviceService.updateSysDeviceByQuery(
        { id },
        { ...req.body }
      );
      return response.dispatch(
        "SysDevice updated ! ",
        { sysDevice: updatedSysDevice },
        res,
        200
      );
      // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
  deleteSysDeviceHandler: async function (req, res) {
    try {
      await SysDeviceService.deleteSysDeviceByQuery({ id: req.params.id });
      return response.dispatch(
        "SysDevice deleted successfully ",
        null,
        res,
        200
      ); // wrap data in object to avoid confusion
    } catch (error) {
      console.log(error, "error message");
      return response.error(Handler(error), res);
    }
  },
};
