const mongoose = require("mongoose");
require("mongoose-type-email");
require("mongoose-type-phone");

const PassengerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2 },
    surname: { type: String, required: true, minlength: 2 },
    email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
    phone: { type: mongoose.SchemaTypes.Phone, required: true, unique: true },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    ratingHistory: [Number],
    rating: { type: Number, default: 0 },
    currentTrip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      autopopulate: { maxDepth: 2 },
    },
    upcomingTrips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        autopopulate: { maxDepth: 2 },
      },
    ],
    tripHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        autopopulate: { maxDepth: 2 },
      },
    ],
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  { timestamps: true }
);

PassengerSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Passenger", PassengerSchema);
/*
class Passenger {
  

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
