const mongoose = require("mongoose");
require("mongoose-type-email");
require("mongoose-type-phone");

const PassengerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  surname: { type: String, required: true, minlength: 2 },
  email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
  phone: { type: mongoose.SchemaTypes.Phone, required: true, unique: true },
  profilePicture: String,
  ratingHistory: [Number],
  rating: Number,
  currentTrip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    autopopulate: true,
  },
  upcomingTrips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      autopopulate: true,
    },
  ],
  tripHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      autopopulate: true,
    },
  ],
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
});

PassengerSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Passenger", PassengerSchema);
/*
class Passenger {
  constructor(
    id = uuid.v4(),
    name,
    surname,
    email,
    phone,
    profilePicture = "http://adyrefrigeration.ca/sites/default/files/styles/headshot/adaptive-image/public/nobody.jpg",
    ratingHistory = [],
    rating = 0,
    currentTrip = null,
    upcomingTrips = [],
    tripHistory = [],
    cards = []
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.profilePicture = profilePicture;
    this.ratingHistory = ratingHistory;
    this.rating = rating;
    this.currentTrip = currentTrip;
    this.upcomingTrips = upcomingTrips;
    this.tripHistory = tripHistory;
    this.cards = cards;
  }

  updateProfilePicture(path) {
    this.profilePicture = path;
  }

  bookTrip(trip) {
    if (trip.passengers.find((item) => item.id === this.id)) {
      console.log(`${colors.red(this.name)} already booked this trip.`);
    } else if (
      trip.vehicle.availableSeat > 0 &&
      trip.status === TripStatus.AVAILABLE
    ) {
      trip.passengers.push(this);
      this.upcomingTrips.push(trip);
      trip.vehicle.availableSeat -= 1;
      if (trip.vehicle.availableSeat === 0) {
        trip.status = TripStatus.BOOKED;
      }
      console.log(
        `${colors.red(this.name)} booked for ${colors.magenta(
          trip.driver.name
        )}'s trip from ${colors.bgYellow.bold.white(
          trip.from
        )} to ${colors.bgBlue.bold.white(trip.destination)}`
      );
    } else if (
      trip.vehicle.availableSeat === 0 ||
      trip.status === TripStatus.BOOKED
    ) {
      console.log(`This trip is booked. There is no available seat.`);
    } else if (trip.status === TripStatus.CANCELLED) {
      console.log(`This trip is cancelled.`);
    }
  }
  cancelTrip(trip) {
    if (trip.passengers.findIndex((o) => o.id === this.id) !== -1) {
      const index = this.upcomingTrips.findIndex((o) => o.id === trip.id);
      this.upcomingTrips.splice(index, 1);
      const index2 = trip.passengers.findIndex((o) => o.id === this.id);
      trip.passengers.splice(index2, 1);
      trip.status = TripStatus.AVAILABLE;
      trip.vehicle.availableSeat += 1;
      console.log(
        `${colors.red(this.name)} calcelled booking for ${colors.magenta(
          trip.driver.name
        )}'s trip from ${colors.bgYellow.bold.white(
          trip.from
        )} to ${colors.bgBlue.bold.white(trip.destination)}`
      );
    } else {
      console.log(`${colors.red(this.name)} is not in this trip`);
    }
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
      if (driver.ratingHistory.length === 20) {
        driver.ratingHistory.pop();
      }
      driver.ratingHistory.push(rate);
    }
    driver.rating =
      driver.ratingHistory.reduce((a, b) => a + b, 0) / ratingHistory.length;
  }

  static create({
    id,
    name,
    surname,
    email,
    phone,
    profilePicture,
    ratingHistory,
    rating,
    currentTrip,
    upcomingTrips,
    tripHistory,
    cards,
  }) {
    return new Passenger(
      id,
      name,
      surname,
      email,
      phone,
      profilePicture,
      ratingHistory,
      rating,
      currentTrip,
      upcomingTrips,
      tripHistory,
      cards
    );
  }
}

module.exports = Passenger;
*/
