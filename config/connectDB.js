const mongoose = require("mongoose");

// MONGO DB AUTH
const connectDB = async () => {
  try {
    const mongoConnect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
