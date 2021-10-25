const Seats = require("../models/Seats");
const Bookings = require('../models/Bookings');
const moment = require('moment');

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

exports.bookSeat = async (req, res, next) => {
  try {
    const { name, mobile, seats } = req.body;
    if (seats.length > 6) {
      return res.status(400).json({
        err: "seats must be less than 6"
      })
    }
    const duplicateNumber = await Bookings.findOne({ mobile: mobile });
    if (duplicateNumber != null) {
      return res.status(400).json({
        err: "mobile already added"
      })
    }
    const seatNumbers = [];
    seats.forEach(seat => {
      seatNumbers.push(Number(seat.slice(1, 3)));
    })
    const hS = Math.max(...seatNumbers);
    const booking = {
      name, mobile, seats, hS
    }
    const message = await Bookings.create(booking);
    return res.status(201).json({
      data: message
    })

  }
  catch (err) {
    return res.status(500).json({
      err: err
    })
  }
}

exports.updateBooking = async (req, res, next) => {
  try {
    const { mobile, seats } = req.body;
    if (seats.length > 6) {
      return res.status(400).json({
        err: "seats must be less than 6"
      })
    }
    const findByMobile = await Bookings.findOne({ mobile: mobile }).lean();
    const prevSeats = findByMobile.seats;
    const prevDate = findByMobile.date;
    const bookingId = findByMobile._id;
    const formatDateMs = Date.parse(prevDate);
    const now = new Date();

    if (Number(now.getTime()) - Number(formatDateMs) < 86400000) {
      return res.status(400).json({
        err: "Only Update after 24 hours"
      })
    }
    const newSeats = prevSeats.concat(seats);
    const seatNumbers = [];
    newSeats.forEach(seat => {
      seatNumbers.push(Number(seat.slice(1, 3)));
    })
    console.log(seatNumbers)
    const hS = Math.max(...seatNumbers);
    const updatedSeat = await Bookings.findOneAndUpdate({ mobile: mobile }, { $set: { seats: newSeats, hS: hS, date: Date.now() } }, { new: true })

    newSeats.forEach(async (seat) => {
      await Seats.findOneAndUpdate({ number: seat }, { $set: { bookingId: bookingId, isBooked: true, modifiedAt: Date.now() } }, { new: true })
    })
    return res.status(200).json({
      data: updatedSeat
    })
  }
  catch (err) {
    return res.status(500).json({
      err: err
    })
  }
}



exports.updateSeat = async (req, res, next) => {
  try {
    const { bookingId, seats } = req.body;
    seats.forEach(async (seat) => {
      await Seats.findOneAndUpdate({ number: seat }, { $set: { bookingId: bookingId, isBooked: true, modifiedAt: Date.now() } }, { new: true })

    })
    return res.status(200).json({
      data: "All Seats Added successfully"
    })

  }
  catch (err) {
    return res.status(500).json({
      err: err
    })
  }
}


exports.displayBookings = async (req, res, next) => {
  try {
    const allBookings = await Bookings.find().sort({ hS: "descending" });
    return res.status(200).json({
      data: allBookings
    })
  }
  catch (err) {
    return res.status(500).json({
      err: err
    })
  }
}