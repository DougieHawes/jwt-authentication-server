// importing environment variables
require("dotenv").config();

const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT || 8000;

// setup express server
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());

app.listen(port, console.log(`express server running on port:${port}`));

// connect to mongodb
const mongoose = require("mongoose");

mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mongodb connected");
    }
  }
);

// server routing
app.use("/user", require("./routes/userRoute"));
app.use("/customer", require("./routes/customerRoute"));
