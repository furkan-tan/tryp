const uuid = require("uuid");
class Vehicle {
  constructor(brand, model, year, capacity) {
    this.id = uuid.v4();
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.capacity = capacity;
  }
}
module.exports = Vehicle;
