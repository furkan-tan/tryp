const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      autopopulate: { maxDepth: 2 },
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      autopopulate: { maxDepth: 1 },
    },
    passengers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Passenger",
        autopopulate: { maxDepth: 2 },
      },
    ],
    tripDate: { type: Date, required: true, min: Date.now },
    from: { type: String, required: true },
    destination: { type: String, required: true },
    price: { type: Number, required: true },
    availableSeat: { type: Number, min: 1 },
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
