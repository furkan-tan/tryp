const BaseService = require("./base-service");
const Driver = require("../models/Driver");
const TripService = require("./trip-service");
class DriverService extends BaseService {
  async createTrip(driver, vehicle, tripDate, from, destination, price) {
    const trip = TripService.insert({
      driver,
      vehicle,
      tripDate,
      from,
      destination,
      price,
    });

    driver.upcomingTrips.push(trip);
    if (driver.upcomingTrips.length > 1) {
      driver.upcomingTrips.sort((a.tripDate, b.tripDate), b - a);
    }
  }
}
module.exports = new DriverService(Driver);
