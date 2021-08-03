const BaseService = require("./base-service");
const Trip = require("../models/Trip");
const driverService = require("./driver-service");
const vehicleService = require("./vehicle-service");

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

  async createTrip(driverId, vehicleId, tripDate, from, destination, price) {
    const driver = await driverService.find(driverId);
    const vehicle = await vehicleService.find(vehicleId);
    const trip = await this.insert({
      driver,
      vehicle,
      tripDate,
      from,
      destination,
      price,
    });

    driver.upcomingTrips.push(trip);
    if (driver.upcomingTrips.length > 1) {
      driver.upcomingTrips.sort((a, b) => {
        b.tripDate - a.tripDate;
      });
    }
    await driver.save();
    return trip;
  }

  async editTrip(trip, tripDate, from, destination, price) {
    const index = this.upcomingTrips.findIndex((item) => item.id === trip.id);
    this.upcomingTrips[index].tripDate = tripDate;
    this.upcomingTrips[index].from = from;
    this.upcomingTrips[index].destination = destination;
    this.upcomingTrips[index].price = price;
  }

  async cancelTrip(trip) {
    const index = this.upcomingTrips.findIndex((item) => item.id === trip.id);
    this.trips[index].status = TripStatus.CANCELLED;
    //this.upcomingTrips.filter(item=>item!==trip);
  }
}
module.exports = new TripService(Trip);
