const VehicleSchema = require("./Vehicle");
const mongoose = require("mongoose");
const CarSchema = new mongoose.Schema(
  {
    availableSeat: { type: Number, default: 4, max: 4 },
  },
  { discriminatorKey: "_type" }
);
CarSchema.plugin(require("mongoose-autopopulate"));
module.exports = VehicleSchema.discriminator("Car", CarSchema);
