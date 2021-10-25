const express = require("express");
const {
  getSeats,
  bookSeat,
  updateSeat,
  displayBookings,
  updateBooking,
  toggleArrived,
  editSeats,
  showEditSeats,
} = require("../controllers/seats");

const router = express.Router();

router.route("/seats").get(getSeats);
router.route("/book").post(bookSeat).put(updateSeat);
router.route("/bookings").get(displayBookings).post(toggleArrived);
router.route("/update").put(updateBooking);
router.route("/editseats").post(editSeats);
router.route("/showeditseats").post(showEditSeats);

module.exports = router;
