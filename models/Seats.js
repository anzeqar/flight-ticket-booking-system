const mongoose = require("mongoose");

const SeatsSchema = new mongoose.Schema({
  number: { type: String },
  modifiedAt: { type: Date },
  isBooked: { type: Boolean, default: false },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bookings' },
});

module.exports = mongoose.model("Seats", SeatsSchema);
