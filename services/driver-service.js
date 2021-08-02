const BaseService = require("./base-service");
const Driver = require("../models/Driver");
class DriverService extends BaseService {}
module.exports = new DriverService(Driver);
