const Driver = require("./models/Driver");
const Passenger = require("./models/Passenger");
const {
  printUpcomingTrips,
  printCurrentTrip,
  printTripHistory,
} = require("../tryp/lib/print-trips");
const passengerDatabase = require("./database/passenger-database");
const driverDatabase = require("./database/driver-database");
const tripDatabase = require("./database/trip-database");
//const db = require("./test/db");

const driver = new Driver(
  undefined,
  "John",
  "Smith",
  "john@gmail.com",
  "123456789",
  undefined,
  "123123123"
);

driver.addVehicle("Car", "Toyota", "Camry", "2021");

const camry = driver.vehicles.find((item) => item.model === "Camry");

const tripDate = new Date("August 17, 2021 08:00:00");

driver.createTrip(camry, tripDate, "New York", "Miami", "100");

printUpcomingTrips(driver);

const trip = driver.upcomingTrips[0];

const passenger = new Passenger(
  undefined,
  "George",
  "Odd",
  "george@gmail.com",
  "123456789"
);
const passenger2 = new Passenger(
  undefined,
  "Fred",
  "Odd",
  "george@gmail.com",
  "123456789"
);
const passenger3 = new Passenger(
  undefined,
  "Mikael",
  "Odd",
  "george@gmail.com",
  "123456789"
);
const passenger4 = new Passenger(
  undefined,
  "Dani",
  "Odd",
  "george@gmail.com",
  "123456789"
);
const passenger5 = new Passenger(
  undefined,
  "Dana",
  "Odd",
  "george@gmail.com",
  "123456789"
);

passenger.addCard("George", 1234123412341234, 12, 2022, 111, "Credit_Card");

passenger.bookTrip(trip);
passenger2.bookTrip(trip);
passenger3.bookTrip(trip);
passenger4.bookTrip(trip);
passenger4.bookTrip(trip);
passenger5.bookTrip(trip);
printUpcomingTrips(driver);

console.log(trip);

passengerDatabase.save([
  passenger,
  passenger2,
  passenger3,
  passenger4,
  passenger5,
]);

driverDatabase.save([driver]);

const george = passengerDatabase.findByName("George");

printUpcomingTrips(george);

george.cancelTrip(trip);

passengerDatabase.update(george);
driverDatabase.update(driver);

printUpcomingTrips(george);

//passengerDatabase.insert(passenger5);

const p5 = passengerDatabase.findByName("Dana");

p5.bookTrip(trip);
passengerDatabase.update(p5);
driverDatabase.update(driver);
console.log(passengerDatabase.load());
const drivers = driverDatabase.load();

console.log(drivers);

drivers.forEach(printUpcomingTrips);
drivers.forEach(printCurrentTrip);
drivers.forEach(printTripHistory);

const john = driverDatabase.findByName("John");
john.startTrip(trip);

driverDatabase.update(john);
trip.passengers.forEach((passenger) => passengerDatabase.update(passenger));

const passengers = passengerDatabase.load();
printCurrentTrip(john);

passengers.forEach(printCurrentTrip);

//passengers.forEach(console.log);
