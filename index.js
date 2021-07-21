const Driver = require("./models/Driver");
const Passenger = require("./models/Passenger");
const {
  printUpcomingTrips,
  printCurrentTrip,
  printTripHistory,
} = require("../tryp/lib/print-trips");

const driver = new Driver(
  "John",
  "Smith",
  "john@gmail.com",
  "123456789",
  "123123123"
);

driver.addVehicle("Car", "Toyota", "Camry", "2021");

const camry = driver.vehicles.find((item) => item.model === "Camry");

const tripDate = new Date("August 17, 2021 08:00:00");

driver.createTrip(camry, tripDate, "New York", "Miami", "100");

printUpcomingTrips(driver);

const trip = driver.upcomingTrips[0];

const passenger = new Passenger(
  "George",
  "Odd",
  "george@gmail.com",
  "123456789"
);
const passenger2 = new Passenger(
  "George",
  "Odd",
  "george@gmail.com",
  "123456789"
);
const passenger3 = new Passenger(
  "George",
  "Odd",
  "george@gmail.com",
  "123456789"
);
const passenger4 = new Passenger(
  "George",
  "Odd",
  "george@gmail.com",
  "123456789"
);
const passenger5 = new Passenger(
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
