const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const router = require("./routes/seats");
const Bookings = require('./models/Bookings')
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/bookings', async (req, res, next) => {
    try {
        const { bookingId, isArrived } = req.body;
        let arrivedFlag = isArrived;
        if (isArrived === 'false') { arrivedFlag = false; }
        else if (isArrived === 'true') { arrivedFlag = true; }
        const updatedData = await Bookings.findByIdAndUpdate(bookingId, { $set: { isArrived: !arrivedFlag } }, { new: true })
        return res.status(301).redirect('/bookings')

    }
    catch (err) {
        return res.status(500).json({
            err: err
        })
    }
})
app.use("/api/", router);
app.listen(5000);
