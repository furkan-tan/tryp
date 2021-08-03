const tripService = require("../services/trip-service");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const trips = await tripService.load();
  res.render("trips", { trips });
});

router.get("/:tripId", async (req, res) => {
  const id = req.params.tripId;
  const trip = await tripService.find(id);
  res.render("trip", { trip });
});

router.get("/search", async (req, res) => {
  const driverId = req.query.driverId;
  const trip = await tripService.findBy(driverId);
  res.render("trip", { trip });
});

module.exports = router;
