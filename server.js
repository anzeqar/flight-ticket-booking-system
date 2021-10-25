const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const router = require("./routes/seats");
const Seats = require("./models/Seats");
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for (let i = 65; i <= 70; i++) {
//   for (let j = 1; j <= 30; j++) {
//     if (j < 10) j = "0" + j;
//     let val = j + String.fromCharCode(i);
//     Seats.create({ number: val });
//   }
// }

app.use("/api/", router);
app.listen(5000);
