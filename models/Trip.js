const uuid = require("uuid");
const TripStatus = require("../models/TripStatus");

class Trip {
  constructor(
    id = uuid.v4(),
    driver,
    vehicle,
    passengers = [],
    createdAt = new Date(),
    tripDate,
    from,
    destination,
    price,
    status = TripStatus.AVAILABLE
  ) {
    this.id = id;
    this.driver = driver;
    this.vehicle = vehicle;
    this.passengers = passengers;
    this.createdAt = createdAt;
    this.tripDate = tripDate;
    this.from = from;
    this.destination = destination;
    this.price = price;
    this.status = status;
  }

  static create({
    id,
    driver,
    vehicle,
    passengers,
    createdAt,
    tripDate,
    from,
    destination,
    price,
    status,
  }) {
    return new Trip(
      id,
      driver,
      vehicle,
      passengers,
      createdAt,
      tripDate,
      from,
      destination,
      price,
      status
    );
  }
}

module.exports = Trip;
