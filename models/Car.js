const Vehicle = require("./Vehicle");
class Car extends Vehicle {
  constructor(brand, model, year) {
    super(brand, model, year, 4);
  }
}

module.exports = Car;
