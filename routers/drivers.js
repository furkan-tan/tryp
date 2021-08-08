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
  const { name, surname, email, phone, profilePicture } = req.body;

  const driver = {};

  if (name) driver.name = name;
  if (surname) driver.surname = surname;
  if (email) driver.email = email;
  if (phone) driver.phone = phone;
  if (profilePicture) driver.profilePicture = profilePciture;

  await driverService.update(driverId, driver);

  res.send("Updated");
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

router.patch("/:driverId/trips/:tripId", async (req, res) => {
  const { driverId, tripId } = req.params;
  const { tripDate, from, destination, price, availableSeat } = req.body;
  const trip = {};

  if (tripDate) trip.tripDate = tripDate;
  if (from) trip.from = from;
  if (destination) trip.destination = destination;
  if (price) trip.price = price;
  if (availableSeat) trip.availableSeat = availableSeat;

  await tripService.update(tripId, trip);

  res.send("Updated");
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

router.delete("/:driverId/vehicles/:vehicleId", async (req, res) => {
  const { driverId } = req.params;
  const { vehicleId } = req.params;

  await vehicleService.removeVehicle(driverId, vehicleId);

  res.send("Ok");
});

router.patch("/:driverId/trips/:tripId", async (req, res) => {
  const { driverId, tripId } = req.params;
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
