const Vehicle = require("./Vehicle");
class Van extends Vehicle {
  constructor(brand, model, year) {
    super(brand, model, year, 7);
  }
}
module.exports = Van;
