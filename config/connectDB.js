const mongoose = require("mongoose");

// MONGO DB AUTH
const connectDB = async () => {
  try {
    // Must not write Auth String in Production as Below, Development Only
    const mongoConnect = await mongoose.connect(
      "mongodb+srv://mainuser:qv2VQhNGKKkQ9rJa@flightbookingsystem.naujr.mongodb.net/flightBookingSystem?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
