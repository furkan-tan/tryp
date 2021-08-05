const mongoose = require("mongoose");
const VehicleSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["Car", "Van", "Motorcycle"] },
    brand: String,
    model: String,
    year: { type: Number, min: 2000 },
  },
  { collection: "trips", discriminatorKey: "_type" }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);
