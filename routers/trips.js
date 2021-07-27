const tripDatabase = require("../database/trip-database");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const trips = await tripDatabase.load();
  res.render("trips", { trips });
});

router.get("/:tripId", async (req, res) => {
  const id = req.params.tripId;
  const trip = await tripDatabase.findBy("id", id);
  res.render("trip", { trip });
});

module.exports = router;
