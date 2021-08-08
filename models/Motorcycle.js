const VehicleSchema = require("./Vehicle");
const mongoose = require("mongoose");
const MotorcycleSchema = new mongoose.Schema({
  ...VehicleSchema.obj,
  seatCapacity: { type: Number, default: 1, max: 1 },
});

module.exports = mongoose.model("Motorcycle", MotorcycleSchema);
