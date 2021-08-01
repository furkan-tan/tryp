const VehicleSchema = require("./Vehicle");
const mongoose = require("mongoose");
const CarSchema = new mongoose.Schema({
  ...VehicleSchema.obj,
  availableSeat: { type: Number, default: 4 },
});

module.exports = mongoose.model("Car", CarSchema);
