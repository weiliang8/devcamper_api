const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

const ip = require("ip");
const ip_address = ip.address();

// LOAD ENV VARIABLES
dotenv.config({ path: `${__dirname}/config/config.env` });

// CONNECT TO DATABASE
connectDB();

//ROUTE FILES
const bootcamps = require("./routes/bootcamps");

const app = express();

// BODY PARSER
app.use(express.json());

//DEV LOGGING MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//MOUNT ROUTER
app.use("/api/v1/bootcamps", bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 1000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${ip_address} port ${PORT} ...`
  )
);

// HANDLE UNHANDLED PROMISE REJECTIONS
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`);
  // CLOSE SERVER & EXIT PROCESS
  server.close(() => process.exit(1));
});
