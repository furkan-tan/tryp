const Motorcycle = require("../models/Motorcycle");
const BaseService = require("./base-service");
class MotorcycleService extends BaseService {}
module.exports = new MotorcycleService(Motorcycle);
