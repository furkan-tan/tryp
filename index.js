const {
  printUpcomingTrips,
  printCurrentTrip,
  printTripHistory,
} = require("../tryp/lib/print-trips");
const passengerDatabase = require("./database/passenger-database");
const driverDatabase = require("./database/driver-database");
const tripDatabase = require("./database/trip-database");
//const db = require("./test/db");

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
