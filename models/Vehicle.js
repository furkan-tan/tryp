const mongoose = require("mongoose");
const VehicleSchema = new mongoose.Schema(
  {
    brand: String,
    model: String,
    year: { type: Number, min: 2000 },
    availableSeat: 0,
  },
  { discriminatorKey: "_type" }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);
