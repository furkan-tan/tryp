const VehicleSchema = require("./Vehicle");
const mongoose = require("mongoose");
const MotorcycleSchema = new mongoose.Schema({
  ...VehicleSchema.obj,
  availableSeat: { type: Number, default: 1 },
});

module.exports = mongoose.model("Motorcycle", MotorcycleSchema);
