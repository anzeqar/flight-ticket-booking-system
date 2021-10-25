/**
 * @author anzeqar
 * @title Flight Ticket Booking System
 */

const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const router = require("./routes/seats");
const Seats = require("./models/Seats");

/**
 * @description Connect Database
 * @connect MongoDB Atlas Cloud
 */
connectDB();

/**
 * @description Body Parser
 *
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @description Run Once at Start Time to Create Seats DB
 */
// for (let i = 65; i <= 70; i++) {
//   for (let j = 1; j <= 30; j++) {
//     if (j < 10) j = "0" + j;
//     let val = j + String.fromCharCode(i);
//     Seats.create({ number: val });
//   }
// }

/**
 * @description Link Router
 */
app.use("/api/", router);

/**
 * @description Runs on PORT 5000
 */
app.listen(5000);
