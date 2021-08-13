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
  const passenger = await passengerService.find(req.params.passengerId);
  res.render("passenger", { passenger });
});

router.patch("/:passengerId", async (req, res) => {
  const { passengerId } = req.params;
  const { name, surname, email, phone, profilePicture } = req.body;
  const passenger = {};

  if (name) passenger.name = name;
  if (surname) passenger.surname = surname;
  if (email) passenger.email = email;
  if (phone) passenger.phone = phone;
  if (profilePicture) passenger.profilePicture = profilePicture;

  await passengerService.update(passengerId, passenger);

  res.send("Updated");
});

module.exports = router;
