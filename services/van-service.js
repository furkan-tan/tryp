const Van = require("../models/Van");
const BaseService = require("./base-service");
class VanService extends BaseService {}
module.exports = new VanService(Van);
