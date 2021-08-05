const BaseService = require("./base-service");
const driverService = require("./driver-service");
const Vehicle = require("../models/Vehicle");
const carService = require("./car-service");

class VehicleService extends BaseService {
  async addVehicle(driverId, type, brand, model, year) {
    const driver = await driverService.find(driverId);
    let vehicle = null;
    switch (type) {
      case "Car":
        vehicle = await carService.insert({ brand, model, year });
        break;
      case "Van":
        vehicle = await vanService.insert({ brand, model, year });
        break;
      case "Motorcycle":
        vehicle = await motorcycleService.insert({ brand, model, year });
        break;
      default:
        throw new Error("Vehicle Type is not defined.");
    }

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
