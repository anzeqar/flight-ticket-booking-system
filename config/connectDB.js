const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoConnect = await mongoose.connect(
      "mongodb+srv://mainuser:qv2VQhNGKKkQ9rJa@flightbookingsystem.naujr.mongodb.net/flightBookingSystem?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("connected on mongodb");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
