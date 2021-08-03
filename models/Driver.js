const mongoose = require("mongoose");
const VehicleSchema = require("./Vehicle");
require("mongoose-type-email");
require("mongoose-type-phone");

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  surname: { type: String, required: true, minlength: 2 },
  email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
  phone: { type: mongoose.SchemaTypes.Phone, required: true, unique: true },
  profilePicture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  drivingLicense: String,
  ratingHistory: [Number],
  rating: Number,
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
  vehicles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      autopopulate: { maxDepth: 2 },
    },
  ],
});

//DriverSchema.methods.createTrip= async function(vehicle, tripDate, from, destination, price)

DriverSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Driver", DriverSchema);

/*
class Driver {
  constructor(
    id = uuid.v4(),
    name,
    surname,
    email,
    phone,
    profilePicture = "https://readyrefrigeration.ca/sites/default/files/styles/headshot/adaptive-image/public/nobody.jpg",
    drivingLicense,
    ratingHistory = [],
    rating = 0,
    currentTrip = null,
    upcomingTrips = [],
    tripHistory = [],
    vehicles = []
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.profilePicture = profilePicture;
    this.drivingLicense = drivingLicense;
    this.ratingHistory = ratingHistory;
    this.rating = rating;
    this.currentTrip = currentTrip;
    this.upcomingTrips = upcomingTrips;
    this.tripHistory = tripHistory;
    this.vehicles = vehicles;
  }


  createTrip(vehicle, tripDate, from, destination, price) {
    let trip = new Trip(
      undefined,
      this,
      vehicle,
      [],
      undefined,
      tripDate,
      from,
      destination,
      price,
      undefined
    );
    this.upcomingTrips.push(trip);
    if (this.upcomingTrips.length > 1) {
      this.upcomingTrips.sort((a.tripDate, b.tripDate), b - a);
    }
  }

  editTrip(trip, tripDate, from, destination, price) {
    const index = this.upcomingTrips.findIndex((item) => item.id === trip.id);
    this.upcomingTrips[index].tripDate = tripDate;
    this.upcomingTrips[index].from = from;
    this.upcomingTrips[index].destination = destination;
    this.upcomingTrips[index].price = price;
  }

  cancelTrip(trip) {
    const index = this.upcomingTrips.findIndex((item) => item.id === trip.id);
    this.trips[index].status = TripStatus.CANCELLED;
    //this.upcomingTrips.filter(item=>item!==trip);
  }

  ratePassenger(trip, passenger, rate) {
    if (
      trip.passengers.find(passenger) &&
      trip.status === TripStatus.FINISHED
    ) {
      if (passenger.ratingHistory.length === 20) {
        passenger.ratingHistory.pop();
      }
      passenger.ratingHistory.push(rate);
    }
    passenger.rating =
      passenger.ratingHistory.reduce((a, b) => a + b, 0) / ratingHistory.length;
  }

  startTrip(trip) {
    const index = this.upcomingTrips.findIndex((t) => t.id === trip.id);
    trip.status = TripStatus.IN_PROGRESS;
    this.currentTrip = this.upcomingTrips[index];
    this.upcomingTrips.splice(index, 1);
    trip.passengers.forEach((passenger) => {
      const index = passenger.upcomingTrips.findIndex((t) => t.id === trip.id);
      passenger.currentTrip = passenger.upcomingTrips[index];
      passenger.upcomingTrips.splice(index, 1);
    });
  }

  completeTrip() {
    this.currentTrip.status = TripStatus.FINISHED;
    this.currentTrip.passengers.forEach((passenger) => {
      passenger.tripHistory.push(passenger.currentTrip);
      passenger.currentTrip = null;
    });
    this.tripHistory.push(this.currentTrip);
    this.currentTrip = null;
  }

  static create({
    id,
    name,
    surname,
    email,
    phone,
    profilePicture,
    drivingLicense,
    ratingHistory,
    rating,
    currentTrip,
    upcomingTrips,
    tripHistory,
    vehicles,
  }) {
    return new Driver(
      id,
      name,
      surname,
      email,
      phone,
      profilePicture,
      drivingLicense,
      ratingHistory,
      rating,
      currentTrip,
      upcomingTrips,
      tripHistory,
      vehicles
    );
  }
}

module.exports = Driver;

*/
