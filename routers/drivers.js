const router = require("express").Router();
const driverService = require("../services/driver-service");

router.get("/", async (req, res) => {
  const drivers = await driverService.load();
  res.render("drivers", { drivers });
});

router.post("/", async (req, res) => {
  const driver = await driverService.insert(req.body);
  res.send(driver);
});

router.get("/:driverId", async (req, res) => {
  const driver = await driverService.findBy("id", req.params.driverId);
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

router.post("/:driverId/trips", async (req, res) => {
  const { driverId } = req.params;
  const { vehicle, tripDate, from, destination, price } = req.body;

  const driver = await driverService.findById(driverId);
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

module.exports = router;
