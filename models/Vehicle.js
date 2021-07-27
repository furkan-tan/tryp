const uuid = require("uuid");
class Vehicle {
  constructor(brand, model, year, availableSeat) {
    this.id = uuid.v4();
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.availableSeat = availableSeat;
  }
}
module.exports = Vehicle;
