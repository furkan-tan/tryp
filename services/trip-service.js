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

  async createTrip(
    driverId,
    vehicleId,
    tripDate,
    from,
    destination,
    availableSeat,
    price
  ) {
    const driver = await driverService.find(driverId);
    const vehicle = await vehicleService.find(vehicleId);
    if (availableSeat > vehicle.seatCapacity) {
      return new Error("Exceed Seat Capacity Error");
    }
    const trip = await this.insert({
      driver,
      vehicle,
      tripDate,
      from,
      destination,
      price,
      availableSeat,
    });

    driver.upcomingTrips.push(trip);
    driver.upcomingTrips.sort((a, b) => {
      b.tripDate - a.tripDate;
    });
    await driver.save();
    return trip;
  }

  async cancelTrip(driverId, tripId) {
    const driver = await driverService.find(driverId);
    const trip = await this.find(tripId);
    trip.status = "CANCELLED";

    await this.update(tripId, trip);

    //const index = driver.upcomingTrips.findIndex((item) => item.id === tripId);

    //driver.upcomingTrips.splice(index, 1);
    //await driver.save();
  }
}
module.exports = new TripService(Trip);
