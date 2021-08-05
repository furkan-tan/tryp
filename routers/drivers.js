const router = require("express").Router();
const { tripService } = require("../services");
const driverService = require("../services/driver-service");
const vehicleService = require("../services/vehicle-service");

router.get("/", async (req, res) => {
  const drivers = await driverService.load();
  res.render("drivers", { drivers });
});

router.post("/", async (req, res) => {
  const driver = await driverService.insert(req.body);
  res.send(driver);
});

router.post("/:driverId/trips", async (req, res) => {
  const { driverId } = req.params;
  const { vehicleId } = req.query;
  const { tripDate, from, destination, availableSeat, price } = req.body;

  const date = new Date(tripDate);

  const trip = await tripService.createTrip(
    driverId,
    vehicleId,
    date,
    from,
    destination,
    availableSeat,
    price
  );
  res.send(trip);
});

router.post("/:driverId/vehicles", async (req, res) => {
  const { driverId } = req.params;
  const { type, brand, model, year } = req.body;

  const vehicle = await vehicleService.addVehicle(
    driverId,
    type,
    brand,
    model,
    year
  );
  res.send(vehicle);
});

router.get("/:driverId", async (req, res) => {
  const driver = await driverService.find(req.params.driverId);
  res.render("driver", { driver });
});

router.delete("/:driverId", async (req, res) => {
  await driverService.removeBy("_id", req.params.driverId);
  res.send("Deleted");
});

router.patch("/:driverId", async (req, res) => {
  const { driverId } = req.params;
  const { name } = req.body;

  await driverService.update(driverId, { name });

  res.send("Updated");
});

router.delete("/:driverId/vehicles/:vehicleId", async (req, res) => {
  const { driverId } = req.params;
  const { vehicleId } = req.params;

  await vehicleService.removeVehicle(driverId, vehicleId);

  res.send("Ok");
});

/*
router.post("/:driverId/trips", async (req, res) => {
  const { driverId } = req.params;
  const { vehicle, tripDate, from, destination, price } = req.body;

  const driver = await driverService.find(driverId);
  const trip = await driverService.createTrip(
    driver,
    vehicle,
    tripDate,
    from,
    destination,
    price
  );
  res.send(trip);
});
*/
module.exports = router;
