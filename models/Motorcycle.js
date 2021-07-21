const Vehicle = require("./Vehicle");
class Motorcycle extends Vehicle {
  constructor(brand, model, year) {
    super(brand, model, year, 1);
  }
}
module.exports = Motorcycle;
