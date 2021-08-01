const router = require("express").Router();
const passengerService = require("../services/passenger-service");

router.get("/", async (req, res) => {
  const passengers = await passengerService.load();
  res.render("passengers", { passengers });
});

router.post("/", async (req, res, next) => {
  try {
    const passenger = await passengerService.insert(req.body);
    res.send(passenger);
  } catch (e) {
    next(e);
  }
});

//router.post("/:passengerId/trips");

router.delete("/:passengerId", async (req, res) => {
  await passengerService.removeBy("_id", req.params.passengerId);
  res.send("OK");
});

router.get("/:passengerId", async (req, res) => {
  const passenger = await passengerService.findById(req.params.passengerId);
  res.render("passenger", { passenger });
});

router.patch("/:passengerId", async (req, res) => {
  const { name } = req.body;

  await passengerService.update(req.params.passengerId, { name });
});

module.exports = router;
