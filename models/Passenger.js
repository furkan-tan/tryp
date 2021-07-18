const { default: TripStatus } = require("./TripStatus");
const id = require("uuid");

class Passenger {
  constructor(name, surname, email, phone) {
    this.id = id.v4();
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.profilePicture =
      "https://readyrefrigeration.ca/sites/default/files/styles/headshot/adaptive-image/public/nobody.jpg";
    this.ratingList = [];
    this.rating = 0;
    this.currentTrip = null;
    this.bookedTrips = [];
    this.tripHistory = [];
    this.cards = [];
  }

  updateProfilePicture(path) {
    this.profilePicture = path;
  }

  bookTrip(trip) {
    if (trip.passengers.find((item) => item.id === this.id)) {
      console.log(`You already booked this trip.`);
    } else if (
      trip.vehicle.capacity > trip.passengers.length &&
      trip.status === TripStatus.AVAILABLE
    ) {
      trip.passengers.push(this);
      this.bookedTrips.push(trip);
      if (trip.vehicle.capacity === trip.passengers.length) {
        trip.status = TripStatus.BOOKED;
      }
      console.log(
        `You booked a trip for ${trip.driver.name}'s drive from ${trip.from} to ${trip.destination}`
      );
    } else if (
      trip.vehicle.capacity === trip.passengers.length ||
      trip.status === TripStatus.BOOKED
    ) {
      console.log(`This trip is booked. There is no available seat.`);
    } else if (trip.status === TripStatus.CANCELLED) {
      console.log(`This trip is cancelled.`);
    }
  }
  cancelTrip(trip) {
    this.bookedTrips.filter((item) => item !== trip);
    trip.passenger.filter((item) => item !== this);
  }

  addCard(name, cardNumber, expirationMonth, expirationYear, cvv, type) {
    const card = new Card(
      name,
      cardNumber,
      expirationMonth,
      expirationYear,
      cvv,
      type
    );
    this.cards.push(card);
  }

  rateDriver(trip, driver, rate) {
    if (trip.driver.id === driver.id && trip.status === TripStatus.FINISHED) {
      if (driver.ratingList.length === 20) {
        driver.ratingList.pop();
      }
      driver.ratingList.push(rate);
    }
    driver.rating =
      driver.ratingList.reduce((a, b) => a + b, 0) / ratingList.length;
  }
}

module.exports = Passenger;
