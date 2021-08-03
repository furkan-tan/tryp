const Vehicle = require("./Vehicle");
const mongoose = require("mongoose");
const CarSchema = new mongoose.Schema(
  {
    availableSeat: { type: Number, default: 4, max: 4 },
  },
  { discriminatorKey: "_type" }
);
module.exports = Vehicle.discriminator("Car", CarSchema);
