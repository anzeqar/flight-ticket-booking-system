/**
 * @author anzeqar
 * @title Flight Ticket Booking System
 */

const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const router = require("./routes/seats");
const Seats = require("./models/Seats");
const path = require("path");

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

// Uncomment Only Once To Create New Seats DB
for (let i = 65; i <= 70; i++) {
  for (let j = 1; j <= 30; j++) {
    if (j < 10) j = "0" + j;
    let val = j + String.fromCharCode(i);
    Seats.create({ number: val });
  }
}

/**
 * @description Link Router
 */
app.use("/api/", router);

/**
 * @description Loads REACT FRONTEND
 */
app.use(express.static("build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

/**
 * @description Runs on PORT 5000
 */
app.listen(process.env.PORT || 5000);
