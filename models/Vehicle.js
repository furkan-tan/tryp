const mongoose = require("mongoose");
const VehicleSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: { type: Number, min: 2000 },
});
module.exports = mongoose.model("Vehicle", VehicleSchema);
