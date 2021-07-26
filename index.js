const express = require("express");
const driverDatabase = require("./database/driver-database");
const passengerDatabase = require("./database/passenger-database");
const Passenger = require("./models/Passenger");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.set("view engine", "pug");

app.get("/", (req, res) => {
  //res.send("Hello world");
  res.render("index");
});

app.get("/passengers", async (req, res) => {
  const passengers = await passengerDatabase.load();
  res.render("passengers", { passengers });
});

app.get("/passengers/:passengerId", async (req, res) => {
  const passenger = await passengerDatabase.findBy(
    "id",
    req.params.passengerId
  );
  res.render("passenger", { passenger });
});

app.post("/passengers", async (req, res) => {
  const passenger = await passengerDatabase.insert(req.body);
  res.send(passenger);
});

app.post("/passengers/:passengerId/trips");

app.delete("/passengers/:passengerId", async (req, res) => {
  await passengerDatabase.removeByName("id", req.params.passengerId);
  res.send("OK");
});

app.get("/drivers", async (req, res) => {
  const drivers = await driverDatabase.load();
  res.render("drivers", { drivers });
});

app.get("/drivers/:driverId", async (req, res) => {
  const driver = await driverDatabase.findBy("id", req.params.driverId);
  res.render("driver", { driver });
});

app.listen(3000, () => {
  console.log("started listening port 3000");
});
