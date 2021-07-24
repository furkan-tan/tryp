const BaseDatabase = require("./base-database");
const Trip = require("../models/Trip");

class TripDatabase extends BaseDatabase {}
module.exports = new TripDatabase(Trip);
