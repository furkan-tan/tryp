const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  cardNumber: {
    type: Number,
    validate: {
      validator: function (v) {
        return /\d{16}/.test(v);
      },
      message: (props) => `${props.value} is not a valid Card Number!`,
    },
    required: [true, "User Card Number required"],
  },
  expirationMonth: {
    type: Number,
    validate: {
      validator: function (v) {
        return /\d{2}/.test(v);
      },
      message: (props) => `${props.value} is not a valid Expiration Date!`,
    },
    required: [true, "Expiration Date is required"],
    min: 01,
    max: 12,
  },
  expirationYear: {
    type: Number,
    validate: {
      validator: function (v) {
        return /\d{2}/.test(v);
      },
      message: (props) => `${props.value} is not a valid Expiration Date!`,
    },
    required: [true, "Expiration Date is required"],
    min: 21,
  },
  cvv: {
    type: Number,
    validate: {
      validator: function (v) {
        return /\d{3}/.test(v);
      },
      message: (props) => `${props.value} is not a valid CVV Number!`,
    },
    required: [true, "CVV Number is required"],
  },
  type: {
    type: String,
    enum: ["CREDITCARD", "DEBITCARD", "GIFTCARD"],
  },
});

module.exports = mongoose.model("Card", CardSchema);
