const mongoose = require("mongoose");

const SeatsSchema = new mongoose.Schema({
  number: { type: String },
  modifiedAt: { type: Date },
  isBooked: { type: Boolean, default: false },
  bookingId: { type: String },
});

module.exports = mongoose.model("Seats", SeatsSchema);
