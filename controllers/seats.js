const Seats = require("../models/Seats");
const Bookings = require("../models/Bookings");

/**
 * @method GET
 * @description Fetch All Seats
 */

exports.getSeats = async (req, res, next) => {
  try {
    const seats = await Seats.find().sort({ number: "ascending" });
    return res.status(200).json({ data: seats });
  } catch (err) {
    return res.status(500).json({
      err: err,
    });
  }
};

/**
 * @method POST
 * @description Book Selected Seats on Bookings Schema
 */

exports.bookSeat = async (req, res, next) => {
  try {
    const { name, mobile, seats } = req.body;

    if (seats.length > 6) {
      return res.status(400).json({
        err: "seats must be less than 6",
      });
    }
    const duplicateNumber = await Bookings.findOne({ mobile: mobile });
    if (duplicateNumber != null) {
      return res.status(400).json({
        err: "mobile already added",
      });
    }
    const seatNumbers = [];
    seats.forEach((seat) => {
      seatNumbers.push(Number(seat.slice(0, 2)));
    });
    const hS = Math.max(...seatNumbers);
    const booking = { name, mobile, seats, hS };
    const message = await Bookings.create(booking);

    return res.status(201).json({
      data: message,
    });
  } catch (err) {
    return res.status(500).json({
      err: err,
    });
  }
};

/**
 * @method PUT
 * @description Update on Seats Schema
 */
exports.updateSeat = async (req, res, next) => {
  try {
    const { bookingId, seats, date, mobile } = req.body;
    seats.forEach(async (seat) => {
      await Seats.findOneAndUpdate(
        { number: seat },
        {
          $set: {
            bookingId: bookingId,
            isBooked: true,
            modifiedAt: Date.now(),
          },
        },
        { new: true }
      );
    });
    const data = {
      mobile,
      date,
      bookingId,
      seats,
    };
    return res.status(200).json({
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      err: err,
    });
  }
};

/**
 * @method PUT
 * @description Update Seats Bookings
 */
exports.updateBooking = async (req, res, next) => {
  try {
    const { bookingId, seats } = req.body;
    if (seats.length > 6) {
      return res.status(400).json({
        err: "seats must be less than 6",
      });
    }
    const findById = await Bookings.findById(bookingId);
    const prevSeats = findById.seats;

    // Comment below to update within 24 hours
    const prevDate = findById.date;
    const formatDateMs = Date.parse(prevDate);
    const now = new Date();
    if (Number(now.getTime()) - Number(formatDateMs) < 86400000) {
      return res.status(400).json({
        err: "Update Seats only after 24 hours",
      });
    }
    // Comment Above to update within 24 hours

    const newSeats = prevSeats.concat(seats);
    const seatNumbers = [];
    newSeats.forEach((seat) => {
      seatNumbers.push(Number(seat.slice(0, 2)));
    });
    const hS = Math.max(...seatNumbers);
    const updatedSeat = await Bookings.findByIdAndUpdate(
      bookingId,
      { $set: { seats: newSeats, hS: hS, date: Date.now() } },
      { new: true }
    );

    newSeats.forEach(async (seat) => {
      await Seats.findOneAndUpdate(
        { number: seat },
        {
          $set: {
            bookingId: bookingId,
            isBooked: true,
            modifiedAt: Date.now(),
          },
        },
        { new: true }
      );
    });
    return res.status(200).json({
      data: updatedSeat,
    });
  } catch (err) {
    return res.status(500).json({
      err: err,
    });
  }
};

/**
 * @method GET
 * @description Displays All Bookings
 */
exports.displayBookings = async (req, res, next) => {
  try {
    const allBookings = await Bookings.find().sort({ hS: "descending" });
    return res.status(200).json({
      data: allBookings,
    });
  } catch (err) {
    return res.status(500).json({
      err: err,
    });
  }
};

/**
 * @method POST
 * @description Toggle Arrival Status
 */
exports.toggleArrived = async (req, res, next) => {
  try {
    const { bookingId, isArrived } = req.body;
    let arrivedFlag = isArrived;
    if (isArrived === "false") {
      arrivedFlag = false;
    } else if (isArrived === "true") {
      arrivedFlag = true;
    }
    const updatedData = await Bookings.findByIdAndUpdate(
      bookingId,
      { $set: { isArrived: !arrivedFlag } },
      { new: true }
    );
    return res.status(200).json({
      data: "toggled successfully",
    });
  } catch (err) {
    return res.status(500).json({
      err: err,
    });
  }
};

/**
 * @method POST
 * @description Shows All Seats By Booking Id
 */
exports.showEditSeats = async (req, res, next) => {
  try {
    const { bookingId } = req.body;

    const data = await Seats.find({ bookingId: bookingId }).sort({
      number: "ascending",
    });

    if (data.length === 0) {
      return res.status(404).json({
        err: "No such booking Id",
      });
    }
    return res.status(200).json({ data: data });
  } catch (err) {
    return res.status(500).json({
      err: err,
    });
  }
};

/**
 * @method PUT
 * @description Removes Unselected Seats
 */
exports.editSeats = async (req, res, next) => {
  try {
    const { bookingId, seats } = req.body;
    const oldseats = await Seats.find({ bookingId: bookingId });
    const oldSeats = oldseats.map((seat) => seat.number);
    const seatNumbers = [];
    seats.forEach((seat) => {
      seatNumbers.push(Number(seat.slice(0, 2)));
    });
    const hS = Math.max(...seatNumbers);
    const seatsUpdateOnBookings = await Bookings.findByIdAndUpdate(
      bookingId,
      { $set: { seats: seats, hS: hS, date: Date.now() } },
      { new: true }
    );

    oldSeats.forEach(async (seat) => {
      if (!seats.includes(seat)) {
        await Seats.findOneAndUpdate(
          { number: seat },
          {
            $set: {
              bookingId: null,
              isBooked: false,
              modifiedAt: null,
            },
          },
          { new: true }
        );
      }
    });

    const returnNewSeats = await Seats.find({ bookingId: bookingId }).sort({
      number: "ascending",
    });
    return res.status(200).json({ data: returnNewSeats });
  } catch (err) {
    return res.status(500).json({
      err: err,
    });
  }
};
