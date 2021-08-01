const Driver = require("./models/Driver");
const Passenger = require("./models/Passenger");
const passengerservice = require("./service/passenger-service");
const driverservice = require("./service/driver-service");

const {
  printUpcomingTrips,
  printCurrentTrip,
  printTripHistory,
} = require("./lib/print-trips");
const tripservice = require("./service/trip-service");

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

(async () => {
  try {
    await passengerservice.save([
      passenger,
      passenger2,
      passenger3,
      passenger4,
      passenger5,
    ]);

    await driverservice.save([driver]);

    await tripservice.save([trip]);

    const george = await passengerservice.findByName("George");

    printUpcomingTrips(george);

    george.cancelTrip(trip);

    await passengerservice.update(george);
    await driverservice.update(driver);
    await tripservice.update(trip);

    printUpcomingTrips(george);
    /*
    george.cancelTrip(trip);

    await passengerservice.update(george);
    await driverservice.update(driver);
    await tripservice.update(trip);

    printUpcomingTrips(george);
*/
    const john = await driverservice.findByName("John");

    printUpcomingTrips(john);
  } catch (e) {
    return console.log(e);
  }
})();

/*

const {
  printUpcomingTrips,
  printCurrentTrip,
  printTripHistory,
} = require("../tryp/lib/print-trips");
const passengerservice = require("./service/passenger-service");
const driverservice = require("./service/driver-service");
const tripservice = require("./service/trip-service");
//const db = require("./test/db");

//passengerservice.insert(passenger5);

const p5 = passengerservice.findByName("Dana");

p5.bookTrip(trip);
passengerservice.update(p5);
driverservice.update(driver);
console.log(passengerservice.load());
const drivers = driverservice.load();

console.log(drivers);

drivers.forEach(printUpcomingTrips);
drivers.forEach(printCurrentTrip);
drivers.forEach(printTripHistory);

const john = driverservice.findByName("John");
john.startTrip(trip);

driverservice.update(john);
trip.passengers.forEach((passenger) => passengerservice.update(passenger));

const passengers = passengerservice.load();
printCurrentTrip(john);

passengers.forEach(printCurrentTrip);

//passengers.forEach(console.log);

*/
