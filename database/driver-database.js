const BaseDatabase = require("./base-database");
const Driver = require("../models/Driver");
class DriverDatabase extends BaseDatabase {}
module.exports = new DriverDatabase(Driver);
