const BaseDatabase = require("./base-database");
const Passenger = require("../models/Passenger");

class PassengerDatabase extends BaseDatabase {}

module.exports = new PassengerDatabase(Passenger);
