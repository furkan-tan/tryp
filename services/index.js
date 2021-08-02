const passengerService = require("./passenger-service");
const driverService = require("./driver-service");
const tripService = require("./trip-service");
const carService = require("./car-service");
const motorcycleService = require("./motorcycle-service");
const vanService = require("./van-service");

module.exports = {
  passengerService,
  driverService,
  carService,
  motorcycleService,
  vanService,
  tripService,
};
