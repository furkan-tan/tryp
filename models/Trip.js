const id = require("uuid");
const TripStatus = require("../models/TripStatus");
const colors = require("colors");

class Trip {
  constructor(driver, vehicle, tripDate, from, destination, price) {
    this.id = id.v4();
    this.driver = driver;
    this.vehicle = vehicle;
    this.passengers = [];
    this.createdAt = new Date();
    this.tripDate = tripDate;
    this.from = from;
    this.destination = destination;
    this.price = price;
    this.status = TripStatus.AVAILABLE;
  }

  printTrip() {
    console.log(
      `${colors.magenta(
        this.driver.name
      )} drives from ${colors.bgYellow.bold.white(
        this.from
      )} to ${colors.bgBlue.bold.white(this.destination)}`
    );
    console.log(`Passengers for this trip:`);
    if (!this.passengers.length) {
      console.log("Nobody have booked this trip yet.".yellow);
    }
    this.passengers.forEach((item, index) =>
      console.log(`${index + 1}-${colors.red(item.name)}`)
    );
  }
}

module.exports = Trip;
