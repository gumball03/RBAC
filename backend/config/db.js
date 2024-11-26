const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log(
    "Successfully connected to the database:",
    process.env.DB_CONNECTION
  );
});

mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
});
