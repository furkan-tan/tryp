const BaseService = require("./base-service");
const Trip = require("../models/Trip");

class TripService extends BaseService {
  async findByFrom(from) {
    return this.findBy("from", from);
  }
  async findByDestination(destination) {
    return this.findBy("destination", destination);
  }
  async findByDriverId(driverId) {
    return this.findBy("driver", driverId);
  }
}
module.exports = new TripService(Trip);
