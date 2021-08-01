const VehicleSchema = require("./Vehicle");
const mongoose = require("mongoose");
const VanSchema = new mongoose.Schema({
  ...VehicleSchema.obj,
  availableSeat: { type: Number, default: 7 },
});

module.exports = mongoose.model("Van", VanSchema);
