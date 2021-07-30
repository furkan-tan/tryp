const router = require("express").Router();
const passengerDatabase = require("../database/passenger-database");

router.get("/", async (req, res) => {
  const passengers = await passengerDatabase.load();
  res.render("passengers", { passengers });
});

router.post("/", async (req, res) => {
  const passenger = await passengerDatabase.insert(req.body);
  res.send(passenger);
});

//router.post("/:passengerId/trips");

router.delete("/:passengerId", async (req, res) => {
  await passengerDatabase.removeBy("_id", req.params.passengerId);
  res.send("OK");
});

router.get("/:passengerId", async (req, res) => {
  const passenger = await passengerDatabase.findBy(
    "_id",
    req.params.passengerId
  );
  res.render("passenger", { passenger });
});

router.patch("/:passengerId", async (req, res) => {
  const { name } = req.body;

  await passengerDatabase.update(req.params.passengerId, { name });
});

module.exports = router;
