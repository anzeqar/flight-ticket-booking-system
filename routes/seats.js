const express = require("express");
const { getSeats, bookSeat, updateSeat, displayBookings, updateBooking } = require("../controllers/seats");

const router = express.Router();

router.route("/seats").get(getSeats);
router.route("/book").post(bookSeat).put(updateSeat);
router.route("/bookings").get(displayBookings);
router.route("/update").put(updateBooking);

module.exports = router;
