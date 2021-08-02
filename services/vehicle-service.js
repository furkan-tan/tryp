const BaseService = require("./base-service");
const carService = require("./car-service");
const driverService = require("./driver-service");
const motorcycleService = require("./motorcycle-service");
const vanService = require("./van-service");
const Vehicle = require("../models/Vehicle");

class VehicleService extends BaseService {
  async addVehicle(driverId, type, brand, model, year) {
    const driver = await driverService.find(driverId);
    let vehicleType = null;
    if (type === "Car") {
      vehicleType = await carService.insert({ brand, model, year });
    } else if (type === "Van") {
      vehicleType = await vanService.insert({ brand, model, year });
    } else if (type === "Motorcycle") {
      vehicleType = await motorcycleService.insert({ brand, model, year });
    }

    const vehicle = await this.find(vehicleType.id);

    driver.vehicles.push(vehicle);

    await driver.save();

    return vehicle;
  }

  async removeVehicle(driverId, vehicleId) {
    const driver = await driverService.find(driverId);
    const index = driver.vehicles.findIndex((item) => item.id === vehicleId);
    await this.removeBy("_id", vehicleId);

    driver.vehicles.splice(index, 1);

    await driver.save();
  }
}

module.exports = new VehicleService(Vehicle);
