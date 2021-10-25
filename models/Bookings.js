const mongoose = require("mongoose");

const BookingsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    hS: { type: Number, required: true },
    seats: { type: Array, required: true },
    isArrived: { type: Boolean, default: false },
    date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Bookings", BookingsSchema);
