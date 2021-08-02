const Car = require("../models/Car");
const BaseService = require("./base-service");
class CarService extends BaseService {}
module.exports = new CarService(Car);
