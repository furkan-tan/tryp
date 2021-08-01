const mongoose = require("mongoose");

const TripSchema = mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      autopopulate: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    passengers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Passenger",
        autopopulate: true,
      },
    ],
    tripDate: { type: Date, required: true },
    from: { type: String, required: true },
    destination: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["AVAILABLE", "BOOKED", "IN_PROGRESS", "FINISHED", "CANCELLED"],
      default: "AVAILABLE",
    },
  },
  { timestamps: true }
);

TripSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Trip", TripSchema);
/*
class Trip {
  constructor(
    id = uuid.v4(),
    driver,
    vehicle,
    passengers = [],
    createdAt = new Date(),
    tripDate,
    from,
    destination,
    price,
    status = TripStatus.AVAILABLE
  ) {
    this.id = id;
    this.driver = driver;
    this.vehicle = vehicle;
    this.passengers = passengers;
    this.createdAt = createdAt;
    this.tripDate = tripDate;
    this.from = from;
    this.destination = destination;
    this.price = price;
    this.status = status;
  }

  static create({
    id,
    driver,
    vehicle,
    passengers,
    createdAt,
    tripDate,
    from,
    destination,
    price,
    status,
  }) {
    return new Trip(
      id,
      driver,
      vehicle,
      passengers,
      createdAt,
      tripDate,
      from,
      destination,
      price,
      status
    );
  }
}

module.exports = Trip;
*/
