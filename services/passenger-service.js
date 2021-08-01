const BaseService = require("./base-service");
const Passenger = require("../models/Passenger");

class PassengerService extends BaseService {}

module.exports = new PassengerService(Passenger);
