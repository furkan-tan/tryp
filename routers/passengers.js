const router = require("express").Router();
const passengerDatabase = require("../database/passenger-database");

router.get("/", async (req, res) => {
  const passengers = await passengerDatabase.load();
  res.render("passengers", { passengers });
});

router.get("/:passengerId", async (req, res) => {
  const passenger = await passengerDatabase.findBy(
    "id",
    req.params.passengerId
  );
  res.render("passenger", { passenger });
});

router.post("/", async (req, res) => {
  const passenger = await passengerDatabase.insert(req.body);
  res.send(passenger);
});

//router.post("/:passengerId/trips");

router.delete("/:passengerId", async (req, res) => {
  await passengerDatabase.removeByName("id", req.params.passengerId);
  res.send("OK");
});

module.exports = router;
