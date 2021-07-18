const id = require("uuid");
class Trip {
  constructor(driver, vehicle, tripDate, from, destination, price) {
    (this.id = id.v4()),
      (this.driver = driver),
      (this.vehicle = vehicle),
      (this.passengers = []),
      (this.createdAt = new Date()),
      (this.tripDate = tripDate),
      (this.from = from),
      (this.destination = destination),
      (this.price = price),
      (this.status = TripStatus.AVAILABLE);
  }

  print() {
    console.log(
      `${this.driver.name} drives from ${this.from} to ${this.destionation}`
    );
    console.log(`Passengers for this trip:`);
    if (!trip.passengers) {
      console.log("Nobody have booked the trip yet.");
    }
    this.passengers.forEach((item, index) =>
      console.log(`${index + 1}-${item.name}`)
    );
  }
}

module.exports = Trip;
